import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BookingConfirmationPage() {
  return (
    <div className="container mx-auto p-4 space-y-6 text-center">
      <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
      <p className="text-xl">Thank you for booking your ride with us.</p>
      <p>Your booking reference number is: <strong>RB12345</strong></p>
      <p>A confirmation email has been sent to your registered email address.</p>
      <div className="space-y-4">
        <Button asChild className="w-full">
          <Link href="/booking-history">View Booking History</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}