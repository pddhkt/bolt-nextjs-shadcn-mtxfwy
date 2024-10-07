"use server"

import { z } from "zod";
import { authenticatedAction } from "@/lib/safe-action";
import { rateLimitByKey } from "@/lib/limiter";

const CancelBookingSchema = z.object({
  bookingId: z.string(),
});

export const cancelBookingAction = authenticatedAction
  .createServerAction()
  .input(CancelBookingSchema)
  .handler(async ({ input, ctx: { session } }) => {
    await rateLimitByKey({ key: "cancel_booking_attempt", limit: 5, window: 60000 }); // 5 cancellation attempts per minute

    console.log("Attempting to cancel booking with input:", input);

    try {
      const response = await fetch(`http://127.0.0.1:8787/api/bookings/${input.bookingId}/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session}`,
        },
      });

      if (response.ok) {
        console.log("Booking cancellation successful");
        return { success: true };
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Booking cancellation failed");
      }
    } catch (error) {
      console.error("Error during booking cancellation:", error);
      throw new Error("An unexpected error occurred during booking cancellation");
    }
  });