'use server'

import { getAuthSession } from "./cookies";

export const getBookingById = async (id: string) => {
  const authSession = getAuthSession();

  if (!authSession) {
    return { error: "User is not authenticated" };
  }

  try {
    const response = await fetch(`http://127.0.0.1:8787/api/bookings/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authSession}`,
      },
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const errorData = await response.json();
      return { error: errorData.error || "get booking failed" };
    }
  } catch (error) {
    console.error("Error when getting booking:", error);
    return { error: "An unexpected error occurred" };
  }
}

export const createBooking = async (input: any, session: string) => {

  try {
    const response = await fetch("http://127.0.0.1:8787/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`,
      },
      body: JSON.stringify(input),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const errorData = await response.json();
      return { error: errorData.error || "Booking submission failed" };
    }
  } catch (error) {
    console.error("Error submitting booking:", error);
    return { error: "An unexpected error occurred" };
  }
}

export const getAllBookings = async () => {
  const authSession = getAuthSession();

  if (!authSession) {
    return { error: "User is not authenticated" };
  }

  try {
    const response = await fetch(`http://127.0.0.1:8787/api/bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authSession}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to get bookings" };
    }
  } catch (error) {
    console.error("Error when getting bookings:", error);
    return { error: "An unexpected error occurred" };
  }
}


