import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { BookingInfo } from './_components/BookingInfo'
import { CancelBookingButton } from './_components/CancelBookingButton'
import { getBookingById } from '@/server/bookings'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export interface Booking {
  id: number,
  userId: string,
  pickupLocation: string,
  dropoffLocation: string,
  pickupTime: string,
  isRoundTrip: boolean,
  returnPickupLocation: string,
  returnDropoffLocation: string,
  returnPickupTime: string | null,
  vehicleType: string,
  status: string,
  createdAt: string | null,
}

export default async function BookingDetailsPage({
  params
}: {
  params: {
    id: string
  }
}) {

    const id = params.id

    const booking :Booking = await getBookingById(id)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Booking Details</h1>
        <Button asChild variant="outline">
          <Link href="/booking-history">Back to Booking History</Link>
        </Button>
      </div>
      <BookingInfo booking={booking} />
      {booking.status === 'Upcoming' && (
        <CancelBookingButton bookingId={booking.id.toString()} />
      )}
    </div>
  )
}