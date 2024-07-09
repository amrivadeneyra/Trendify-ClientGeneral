'use client'

import { Button } from '@/components/ui/button'
import { Currency } from '@/components/ui/currency'
import { useCart } from '@/hooks/use-cart'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import jsPDF from 'jspdf'
import 'jspdf-autotable';

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

    const styles = {
      title: { fontSize: 18, font: 'helvetica', fontStyle: 'bold', color: 'black' },
      subtitle: { fontSize: 14, font: 'helvetica', fontStyle: 'normal', color: 'gray' },
      details: { fontSize: 12, font: 'helvetica', fontStyle: 'normal', color: 'black' },
      price: { fontSize: 14, font: 'helvetica', fontStyle: 'bold', color: 'black' },
      separator: { height: 1, backgroundColor: 'gray', margin: '10px 0' },
    };

    let startY = 20;

    items.forEach((item, index) => {
      doc.setFont(styles.title.font, styles.title.fontStyle);
      doc.setFontSize(styles.title.fontSize);
      doc.setTextColor(styles.title.color);
      doc.text(item.name, 15, startY + 10);

      doc.setFont(styles.subtitle.font, styles.subtitle.fontStyle);
      doc.setFontSize(styles.subtitle.fontSize);
      doc.setTextColor(styles.subtitle.color);
      doc.text(`Category: ${item.category}`, 15, startY + 20);

      doc.setFont(styles.details.font, styles.details.fontStyle);
      doc.setFontSize(styles.details.fontSize);
      doc.setTextColor(styles.details.color);
      doc.text(`Size: ${item.size}`, 15, startY + 30);
      doc.text(`Color: ${item.color}`, 80, startY + 30);

      doc.setFont(styles.price.font, styles.price.fontStyle);
      doc.setFontSize(styles.price.fontSize);
      doc.setTextColor(styles.price.color);
      doc.text(`Price: $${item.price}`, 15, startY + 40);

      doc.setDrawColor(styles.separator.backgroundColor);
      doc.setLineWidth(styles.separator.height);
      doc.line(15, startY + 45, 190, startY + 45);

      startY += 60; // Ajusta según la altura total de la sección
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
