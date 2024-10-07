"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { rateLimitByKey } from "@/lib/limiter";
import { authenticatedAction } from "@/lib/safe-action";
import { createBooking } from "@/server/bookings";

export const submitBookingAction = authenticatedAction
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
  .handler(async ({ input, ctx: {session} }) => {
    await rateLimitByKey({ key: "submit_booking", limit: 5, window: 60000 }); // 5 requests per minute

    if(!session) {
      return { error: "You must be logged in to create a booking" };
    }

    const result = await createBooking(input, session);

    if (!result.error) {
      revalidatePath("/booking");
      // redirect(`/booking-details/${result.id}`);
    }

    return result;
  });
