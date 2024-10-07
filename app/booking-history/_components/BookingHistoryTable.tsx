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

interface Booking {
  id: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
}

interface BookingHistoryTableProps {
  bookings: Booking[]
}

export default function BookingHistoryTable({ bookings }: BookingHistoryTableProps) {
  return (
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
            <TableCell>{new Date(booking.pickupTime).toLocaleDateString()}</TableCell>
            <TableCell>{booking.pickupLocation}</TableCell>
            <TableCell>{booking.dropoffLocation}</TableCell>
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
  )
}