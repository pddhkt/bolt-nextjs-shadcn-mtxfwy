"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { rateLimitByKey } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// const bookingSchema = z.object({
//   pickupLocation: z.string().min(1, "Pickup location is required"),
//   dropoffLocation: z.string().min(1, "Dropoff location is required"),
//   pickupTime: z.string().min(1, "Pickup time is required"),
//   isRoundTrip: z.boolean(),
//   returnPickupLocation: z.string().optional(),
//   returnDropoffLocation: z.string().optional(),
//   returnPickupTime: z.string().optional(),
//   vehicleType: z.string().min(1, "Vehicle type is required"),
// });

export const submitBookingAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      pickupLocation: z.string().min(1, "Pickup location is required"),
      dropoffLocation: z.string().min(1, "Dropoff location is required"),
      pickupTime: z.string().min(1, "Pickup time is required"),
      isRoundTrip: z.boolean(),
      returnPickupLocation: z.string().optional(),
      returnDropoffLocation: z.string().optional(),
      returnPickupTime: z.string().optional(),
      vehicleType: z.string().min(1, "Vehicle type is required"),
    })
  )
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: "submit_booking", limit: 5, window: 60000 }); // 5 requests per minute

    const cookieStore = cookies();

    const authSession = cookieStore.get("auth_session");

    if (!authSession) {
      return { error: "User is not authenticated" };
    }

    try {
      const response = await fetch("http://127.0.0.1:8787/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authSession.value}`, // Add the auth token to the headers
        },
        body: JSON.stringify(input),
      });
      if (response.ok) {
        const result = await response.json();

        revalidatePath("/booking");
        // redirect(`/booking-details/${result.id}`);
        return result;
      } else {
        const errorData = await response.json();
        return { error: errorData.error || "Booking submission failed" };
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      return { error: "An unexpected error occurred" };
    }
  });
