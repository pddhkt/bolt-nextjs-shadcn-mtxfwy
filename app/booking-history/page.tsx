"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const bookings = [
  { id: 'RB12345', date: '2023-06-01', from: 'New York', to: 'Boston', status: 'Completed' },
  { id: 'RB12346', date: '2023-06-15', from: 'Los Angeles', to: 'San Francisco', status: 'Upcoming' },
  { id: 'RB12347', date: '2023-06-30', from: 'Chicago', to: 'Detroit', status: 'Cancelled' },
]

export default function BookingHistoryPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Booking History</h1>
      <Table>
        <TableCaption>A list of your recent bookings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.from}</TableCell>
              <TableCell>{booking.to}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>
                <Button asChild variant="link">
                  <Link href={`/booking-details/${booking.id}`}>View Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}