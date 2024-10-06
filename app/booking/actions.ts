"use server"

import { setAuthCookie, getAuthSessionFromHeader } from '@/lib/cookies'
import { BookingData } from './_components/BookingForm'
import { cookies } from 'next/headers'

export async function submitBookingAction(bookingData: BookingData) {
  try {
    // Get the auth session from the cookies

    console.log('bookingData', bookingData)
    const cookieStore = cookies()

    const authSession = cookieStore.get('auth_session')

 


    // const authSession = await getAuthSessionFromHeader(cookieStore)

    if (!authSession) {
      return { error: 'User is not authenticated' }
    }

    const response = await fetch('http://127.0.0.1:8787/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authSession.value}`, // Add the auth token to the headers
      },
      body: JSON.stringify(bookingData),
    })



    if (response.ok) {
      const result = await response.json()

      console.log('result', result)
      return { success: true, bookingId: result.bookingId }
    } else {
      const errorData = await response.json()
      return { error: errorData.error || 'Booking submission failed' }
    }
  } catch (error) {
    console.error('Error submitting booking:', error)
    return { error: 'An unexpected error occurred' }
  }
}