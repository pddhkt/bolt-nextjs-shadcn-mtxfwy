"use server"

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { rateLimitByKey } from '@/lib/limiter'
import { unauthenticatedAction } from '@/lib/safe-action'

const bookingSchema = z.object({
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropoffLocation: z.string().min(1, "Dropoff location is required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  isRoundTrip: z.boolean(),
  returnPickupLocation: z.string().optional(),
  returnDropoffLocation: z.string().optional(),
  returnPickupTime: z.string().optional(),
  vehicleType: z.string().min(1, "Vehicle type is required"),
})

export const submitBookingAction = unauthenticatedAction
  .createServerAction()
  .input(bookingSchema)
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: 'submit_booking', limit: 5, window: 60000 }) // 5 requests per minute

    try {
      const response = await fetch('http://127.0.0.1:8787/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })

      if (response.ok) {
        const result = await response.json()
        revalidatePath('/booking')
        return { success: true, bookingId: result.id }
      } else {
        const errorData = await response.json()
        return { error: errorData.error || 'Booking submission failed' }
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      return { error: 'An unexpected error occurred' }
    }
  })