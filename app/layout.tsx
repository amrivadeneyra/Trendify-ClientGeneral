import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ModalProvider } from '@/providers/modal-provider'
import { ToastProvider } from '@/providers/toast-provider'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'

const urbanist = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TRENDIFY',
  description: 'TRENDIFY',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <ModalProvider />
        <ToastProvider />
        <div className='fixed top-0 w-full z-30 bg-white'>
          <Navbar />
        </div>
        <div className="bg-red-600 w-full py-3 text-sm px-6 uppercase font-semibold text-white hidden md:block top-16 relative z-10" >
          <div className='flex flex-row gap-10 justify-center'>
            <label>Free shipping on orders over $100</label>
            <label>Free shipping on orders over $100</label>
            <label>Free shipping on orders over $100</label>
            <label>Free shipping on orders over $100</label>
            <label>Free shipping on orders over $100</label>
          </div>
        </div>
        {children}
        <Footer />
      </body>
    </html>
  )
}
