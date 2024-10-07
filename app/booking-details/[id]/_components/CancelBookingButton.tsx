"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useServerAction } from "zsa-react";

import { useRouter } from 'next/navigation';
import { cancelBookingAction } from '../actions';

interface CancelBookingButtonProps {
  bookingId: string;
}

export function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
  const { toast } = useToast();
  const router = useRouter();

  const { execute, isPending } = useServerAction(cancelBookingAction, {
    onSuccess() {
      toast({
        title: "Booking Cancelled",
        description: `Your booking ${bookingId} has been cancelled.`,
      });
      router.refresh();
    },
    onError({ err }) {
      toast({
        title: "Cancellation Failed",
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  const handleCancellation = () => {
    execute({ bookingId });
  };

  return (
    <Button onClick={handleCancellation} disabled={isPending}>
      {isPending ? "Cancelling..." : "Cancel Booking"}
    </Button>
  );
}