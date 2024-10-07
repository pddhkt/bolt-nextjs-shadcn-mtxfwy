import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import Navbar from '@/components/Navbar'
import { getUserInfo } from '@/server/users'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ride Booking App',
  description: 'Book your ride with ease',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userInfo = await getUserInfo()

  console.log(userInfo)

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar userInfo={userInfo}/>
        {children}
        <Toaster />
      </body>
    </html>
  )
}