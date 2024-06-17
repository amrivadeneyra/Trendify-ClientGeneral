import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { WhatsAppButton } from '@/components/whatsApp-btn'

import { ModalProvider } from '@/providers/modal-provider'
import { ToastProvider } from '@/providers/toast-provider'

import { Urbanist } from 'next/font/google'
import type { Metadata } from 'next'

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
        <div className='flex flex-col min-h-screen w-full bg-[#EEEEEE] '>
          <div className='fixed top-0 w-full z-30 bg-white'>
            <Navbar />
          </div>

          {/* <CarouselText /> */}

          <WhatsAppButton />
          
          {children}

          <Footer />
        </div>

      </body>
    </html>
  )
}
