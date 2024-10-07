"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { Step1DropOff } from "./Step1DropOff";
import { Step2PickUp } from "./Step2PickUp";
import { Step3Confirmation } from "./Step3Confirmation";
import { submitBookingAction } from "../actions";
import { useServerAction } from "zsa-react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Location {
  id: string;
  name: string;
  area: "hongkong" | "mainland";
}

export interface BookingData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
  isRoundTrip: boolean;
  returnPickupLocation: string;
  returnDropoffLocation: string;
  returnPickupTime: string;
  vehicleType: string;
}

const FormSchema = z.object({
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropoffLocation: z.string().min(1, "Dropoff location is required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  isRoundTrip: z.boolean(),
  returnPickupLocation: z.string().optional(),
  returnDropoffLocation: z.string().optional(),
  returnPickupTime: z.string().optional(),
  vehicleType: z.string().min(1, "Vehicle type is required"),
});

const locations: Location[] = [
  { id: "hk1", name: "Hong Kong Island", area: "hongkong" },
  { id: "hk2", name: "Kowloon", area: "hongkong" },
  { id: "hk3", name: "New Territories", area: "hongkong" },
  { id: "ml1", name: "Shenzhen", area: "mainland" },
  { id: "ml2", name: "Guangzhou", area: "mainland" },
  { id: "ml3", name: "Zhuhai", area: "mainland" },
];

export function BookingForm() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const router = useRouter();

  const { execute, isPending, error, reset, data } = useServerAction(
    submitBookingAction,
    {
      onError({ err }) {
        toast({
          title: "Booking Failed",
          description: err.message,
          variant: 'destructive',
        });
      },
      onSuccess(result) {
        toast({
          title: "Booking Confirmed",
          description: `Your booking ID is ${result.data.id}`,
        });

        // Reset form or navigate to confirmation page
        router.push(`/booking/confirmation/${result.data.id}`);
      },
    }
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pickupLocation: "",
      dropoffLocation: "",
      pickupTime: "",
      isRoundTrip: false,
      returnPickupLocation: "",
      returnDropoffLocation: "",
      returnPickupTime: "",
      vehicleType: "",
    },
  });

  const watchIsRoundTrip = watch("isRoundTrip");
  const watchPickupLocation = watch("pickupLocation");
  const watchDropoffLocation = watch("dropoffLocation");

  const handleLocationSelect = (locationType: string, locationId: string) => {
    setValue(locationType as any, locationId);
    if (locationType === "dropoffLocation" && step === 1) {
      setStep(2);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setValue("isRoundTrip", checked);
    if (checked && watchPickupLocation && watchDropoffLocation) {
      setValue("returnPickupLocation", watchDropoffLocation);
      setValue("returnDropoffLocation", watchPickupLocation);
    } else if (!checked) {
      setValue("returnPickupLocation", "");
      setValue("returnDropoffLocation", "");
      setValue("returnPickupTime", "");
    }
  };

  const handleResetReturnTrip = () => {
    setValue("returnPickupLocation", watchDropoffLocation);
    setValue("returnDropoffLocation", watchPickupLocation);
    setValue("returnPickupTime", "");
  };

  const handleVehicleTypeChange = (vehicleType: string) => {
    setValue("vehicleType", vehicleType);
  };

  const onSubmit = (data: any) => {
    execute(data);
  };

  const dropoffOptions = locations;
  const pickupOptions = locations.filter(
    (loc) =>
      loc.id !== watchDropoffLocation &&
      loc.area !== locations.find((l) => l.id === watchDropoffLocation)?.area
  );
  const returnPickupOptions = locations;
  const returnDropoffOptions = locations.filter(
    (loc) =>
      loc.id !== watch("returnPickupLocation") &&
      loc.area !==
        locations.find((l) => l.id === watch("returnPickupLocation"))?.area
  );

  const isNextButtonDisabled = () => {
    if (!watchPickupLocation || !watch("pickupTime")) {
      return true;
    }
    if (watchIsRoundTrip && !watch("returnPickupTime")) {
      return true;
    }
    return false;
  };

  const handlePickupTimeChange = (time: string) => {
    setValue("pickupTime", time);
  };

  const handleIsRoundTripChange = (isRoundTrip: boolean) => {
    setValue("isRoundTrip", isRoundTrip);
  };

  const handleReturnPickupTimeChange = (time: string) => {
    setValue("returnPickupTime", time);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {step === 1 && (
        <Step1DropOff
          dropoffOptions={dropoffOptions}
          selectedDropoff={watchDropoffLocation}
          onLocationSelect={handleLocationSelect}
        />
      )}
      {step === 2 && (
        <>
          <Step2PickUp
            bookingData={watch()}
            locations={locations}
            pickupOptions={pickupOptions}
            returnPickupOptions={returnPickupOptions}
            returnDropoffOptions={returnDropoffOptions}
            onLocationSelect={handleLocationSelect}
            setPickupTime={handlePickupTimeChange}
            setIsRoundTrip={handleIsRoundTripChange}
            setReturnPickupTime={handleReturnPickupTimeChange}
            onSwitchChange={handleSwitchChange}
            onResetReturnTrip={handleResetReturnTrip}
            setStep={setStep}
          />
          <Button
            type="button"
            onClick={() => setStep(3)}
            disabled={isNextButtonDisabled()}
            className="mt-4"
          >
            Next
          </Button>
        </>
      )}
      {step === 3 && (
        <Step3Confirmation
          bookingData={watch()}
          setVehicleType={handleVehicleTypeChange}
          onBack={() => setStep(2)}
          onSubmit={handleSubmit(onSubmit)}
          isLoading={isPending}
        />
      )}
    </form>
  );
}
