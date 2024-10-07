

import { getAllBookings } from '@/server/bookings'
import BookingHistoryTable from './_components/BookingHistoryTable'


export default async function BookingHistoryPage() {
  const bookings = await getAllBookings()

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Booking History</h1>
      <BookingHistoryTable bookings={bookings} />
    </div>
  )
}