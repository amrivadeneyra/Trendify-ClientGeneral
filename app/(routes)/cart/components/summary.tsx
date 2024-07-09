'use client'

import { Button } from '@/components/ui/button'
import { Currency } from '@/components/ui/currency'
import { useCart } from '@/hooks/use-cart'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import jsPDF from 'jspdf'
import { getOrders } from '@/actions/get-orders'

export const Summary = () => {
  const searchParams = useSearchParams()
  const orders = getOrders()
  const items = useCart((state) => state.items)
  const removeAll = useCart((state) => state.removeAll)

  useEffect(() => {
    if (searchParams.get('success')) {
      generatePDF()
      toast.success('Your order has been placed!')
      console.log(orders)
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

    const marginLeft = 15;
    const marginRight = 190;
    const marginTop = 20;

    const styles = {
      title: { fontSize: 18, font: 'helvetica', fontStyle: 'bold', color: 'black' },
      subtitle: { fontSize: 14, font: 'helvetica', fontStyle: 'normal', color: 'gray' },
      details: { fontSize: 12, font: 'helvetica', fontStyle: 'normal', color: 'black' },
      price: { fontSize: 14, font: 'helvetica', fontStyle: 'bold', color: 'black' },
      separator: { height: 1, backgroundColor: 'gray', margin: '10px 0' },
    };

    let currentY = marginTop;

    items.forEach((item, index) => {
      doc.setFont(styles.title.font, styles.title.fontStyle);
      doc.setFontSize(styles.title.fontSize);
      doc.setTextColor(styles.title.color);
      doc.text(item.name, marginLeft, currentY);

      doc.setFont(styles.subtitle.font, styles.subtitle.fontStyle);
      doc.setFontSize(styles.subtitle.fontSize);
      doc.setTextColor(styles.subtitle.color);
      doc.text(`Category: ${item.category.name}`, marginLeft, currentY + 10);

      doc.setFont(styles.details.font, styles.details.fontStyle);
      doc.setFontSize(styles.details.fontSize);
      doc.setTextColor(styles.details.color);
      doc.text(`Size: ${item.size.name}`, marginLeft, currentY + 20);
      doc.text(`Color: ${item.color.name}`, marginLeft + 80, currentY + 20);

      if (item.images.length > 0) {
        const base64Img = item.images[0].url;
        doc.addImage(base64Img, 'JPEG', marginLeft, currentY + 30, 50, 50);
      }

      doc.setFont(styles.price.font, styles.price.fontStyle);
      doc.setFontSize(styles.price.fontSize);
      doc.setTextColor(styles.price.color);
      doc.text(`Price: $${item.price}`, marginLeft, currentY + 90);

      doc.setDrawColor(styles.separator.backgroundColor);
      doc.setLineWidth(styles.separator.height);
      doc.line(marginLeft, currentY + 95, marginRight, currentY + 95);

      currentY += 105;
    });

    doc.save('order.pdf');
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
