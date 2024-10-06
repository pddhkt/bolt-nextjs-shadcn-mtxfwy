'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Step1DropOff } from './Step1DropOff'
import { Step2PickUp } from './Step2PickUp'
import { Step3Confirmation } from './Step3Confirmation'
import { submitBookingAction } from '../actions'
import { useServerAction } from 'zsa-react'


interface Location {
  id: string;
  name: string;
  area: 'hongkong' | 'mainland';
}

const locations: Location[] = [
  { id: 'hk1', name: 'Hong Kong Island', area: 'hongkong' },
  { id: 'hk2', name: 'Kowloon', area: 'hongkong' },
  { id: 'hk3', name: 'New Territories', area: 'hongkong' },
  { id: 'ml1', name: 'Shenzhen', area: 'mainland' },
  { id: 'ml2', name: 'Guangzhou', area: 'mainland' },
  { id: 'ml3', name: 'Zhuhai', area: 'mainland' },
]

export function BookingForm() {
  const [step, setStep] = useState(1)
  const { toast } = useToast()

  const { execute, isPending, error, reset } = useServerAction(submitBookingAction, {
    onError({ err }) {
      toast({
        title: 'Booking Failed',
        description: err.message,
        variant: 'destructive',
      })
    },
    onSuccess(result) {
      toast({
        title: "Booking Confirmed",
        description: `Your booking ID is ${result.bookingId}`,
      })
      // Reset form or navigate to confirmation page
      // For example: router.push(`/booking/confirmation/${result.bookingId}`)
    },
  })

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(submitBookingAction.inputSchema),
    defaultValues: {
      pickupLocation: '',
      dropoffLocation: '',
      pickupTime: '',
      isRoundTrip: false,
      returnPickupLocation: '',
      returnDropoffLocation: '',
      returnPickupTime: '',
      vehicleType: '',
    }
  })

  const watchIsRoundTrip = watch('isRoundTrip')
  const watchPickupLocation = watch('pickupLocation')
  const watchDropoffLocation = watch('dropoffLocation')

  const handleLocationSelect = (locationType: string, locationId: string) => {
    setValue(locationType as any, locationId)
    if (locationType === 'dropoffLocation' && step === 1) {
      setStep(2)
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setValue('isRoundTrip', checked)
    if (checked && watchPickupLocation && watchDropoffLocation) {
      setValue('returnPickupLocation', watchDropoffLocation)
      setValue('returnDropoffLocation', watchPickupLocation)
    } else if (!checked) {
      setValue('returnPickupLocation', '')
      setValue('returnDropoffLocation', '')
      setValue('returnPickupTime', '')
    }
  }

  const handleResetReturnTrip = () => {
    setValue('returnPickupLocation', watchDropoffLocation)
    setValue('returnDropoffLocation', watchPickupLocation)
    setValue('returnPickupTime', '')
  }

  const onSubmit = async (data: any) => {
    await execute(data)
  }

  const dropoffOptions = locations
  const pickupOptions = locations.filter(loc => loc.id !== watchDropoffLocation && loc.area !== locations.find(l => l.id === watchDropoffLocation)?.area)
  const returnPickupOptions = locations
  const returnDropoffOptions = locations.filter(loc => loc.id !== watch('returnPickupLocation') && loc.area !== locations.find(l => l.id === watch('returnPickupLocation'))?.area)

  const isNextButtonDisabled = () => {
    if (!watchPickupLocation || !watch('pickupTime')) {
      return true
    }
    if (watchIsRoundTrip && !watch('returnPickupTime')) {
      return true
    }
    return false
  }

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
            control={control}
            errors={errors}
            locations={locations}
            pickupOptions={pickupOptions}
            returnPickupOptions={returnPickupOptions}
            returnDropoffOptions={returnDropoffOptions}
            onLocationSelect={handleLocationSelect}
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
          control={control}
          onBack={() => setStep(2)}
          isLoading={isPending}
        />
      )}
    </form>
  )
}