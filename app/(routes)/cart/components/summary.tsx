'use client'

import { Button } from '@/components/ui/button'
import { Currency } from '@/components/ui/currency'
import { useCart } from '@/hooks/use-cart'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import jsPDF from 'jspdf'

export const Summary = () => {
  const searchParams = useSearchParams()
  const items = useCart((state) => state.items)
  const removeAll = useCart((state) => state.removeAll)

  useEffect(() => {
    if (searchParams.get('success')) {
      generatePDF()
      toast.success('Your order has been placed!')
      removeAll()
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong, please try again.')
    }
  }, [searchParams, removeAll])

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      },
    )

    window.location = response.data.url
  }


  const generatePDF = () => {
    const doc = new jsPDF();

    // Configuración de márgenes
    const marginLeft = 15;
    const marginTop = 20;
    const imgWidth = 50;
    const imgHeight = 50;
    const lineHeight = 10;

    let currentY = marginTop;

    items.forEach((item, index) => {
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(item.name, marginLeft, currentY);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Category: ${item.category.name}`, marginLeft, currentY + lineHeight);
      doc.text(`Size: ${item.size.name}, Color: ${item.color.name}`, marginLeft, currentY + lineHeight * 2);

      if (item.images.length > 0) {
        const img = new Image();
        img.crossOrigin = 'Anonymous';

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = imgWidth;
          canvas.height = imgHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
            const dataURL = canvas.toDataURL('image/jpeg');

            doc.addImage(dataURL, 'JPEG', marginLeft, currentY + lineHeight * 3, imgWidth, imgHeight);
            doc.text(`Price: $${item.price}`, marginLeft, currentY + lineHeight * 5);
            
            currentY += lineHeight * 6 + imgHeight;
          } else {
            console.error('Error get img');
          }
        };

        img.src = item.images[0].url; 
      } else {
        doc.text(`Price: $${item.price}`, marginLeft, currentY + lineHeight * 3);
        currentY += lineHeight * 4;
      }

      doc.setLineWidth(0.5);
      doc.line(marginLeft, currentY + lineHeight, 190, currentY + lineHeight);

      currentY += lineHeight * 2;
    });

    doc.save('order.pdf');
  };

  const getBase64Image = (img: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0);

    const dataURL = canvas.toDataURL('image/jpeg');
    return dataURL;
  };


  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>

      <Button
        disabled={items.length === 0}
        onClick={onCheckout}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  )
}
