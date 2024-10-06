"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"

export default function BookingDetailsPage() {
  const params = useParams()
  const { id } = params
  const [booking, setBooking] = useState({
    id: id,
    date: '2023-06-15',
    from: 'Los Angeles',
    to: 'San Francisco',
    status: 'Upcoming',
    vehicle: 'Sedan',
    price: '$120',
  })
  const { toast } = useToast()

  const handleCancellation = () => {
    // Here you would typically call an API to cancel the booking
    setBooking({ ...booking, status: 'Cancelled' })
    toast({
      title: "Booking Cancelled",
      description: `Your booking ${id} has been cancelled.`,
    })
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Booking Details</h1>
      <div className="space-y-2">
        <p><strong>Booking ID:</strong> {booking.id}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>From:</strong> {booking.from}</p>
        <p><strong>To:</strong> {booking.to}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Vehicle:</strong> {booking.vehicle}</p>
        <p><strong>Price:</strong> {booking.price}</p>
      </div>
      {booking.status === 'Upcoming' && (
        <Button onClick={handleCancellation}>Cancel Booking</Button>
      )}
    </div>
  )
}