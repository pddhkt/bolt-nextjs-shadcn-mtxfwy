'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Step1DropOff } from './Step1DropOff'
import { Step2PickUp } from './Step2PickUp'
import { Step3Confirmation } from './Step3Confirmation'
import { submitBookingAction } from '../actions'

interface Location {
  id: string;
  name: string;
  area: 'hongkong' | 'mainland';
}

export interface BookingData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
  isRoundTrip: boolean;
  returnPickupLocation?: string;
  returnDropoffLocation?: string;
  returnPickupTime?: string;
  vehicleType: string;
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
  const [bookingData, setBookingData] = useState<BookingData>({
    pickupLocation: '',
    dropoffLocation: '',
    pickupTime: '',
    isRoundTrip: false,
    returnPickupLocation: '',
    returnDropoffLocation: '',
    returnPickupTime: '',
    vehicleType: '',
  })
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (bookingData.isRoundTrip && bookingData.pickupLocation && bookingData.dropoffLocation) {
      setBookingData(prev => ({
        ...prev,
        returnPickupLocation: prev.dropoffLocation,
        returnDropoffLocation: prev.pickupLocation,
      }))
    } else if (!bookingData.isRoundTrip) {
      setBookingData(prev => ({
        ...prev,
        returnPickupLocation: '',
        returnDropoffLocation: '',
        returnPickupTime: '',
      }))
    }
  }, [bookingData.isRoundTrip, bookingData.pickupLocation, bookingData.dropoffLocation])

  const handleLocationSelect = (locationType: keyof BookingData, locationId: string) => {
    setBookingData(prev => ({ ...prev, [locationType]: locationId }))
    if (locationType === 'dropoffLocation' && step === 1) {
      setStep(2)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setBookingData(prev => ({ ...prev, isRoundTrip: checked }))
  }

  const handleResetReturnTrip = () => {
    setBookingData(prev => ({
      ...prev,
      returnPickupLocation: prev.dropoffLocation,
      returnDropoffLocation: prev.pickupLocation,
      returnPickupTime: '',
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await submitBookingAction(bookingData)
      
      if (result.error) {
        toast({
          title: "Booking Failed",
          description: result.error,
        })
      } else {
        toast({
          title: "Booking Confirmed",
          description: `Your booking ID is ${result.bookingId}`,
        })
        // Reset form or navigate to confirmation page
        // For example: router.push(`/booking/confirmation/${result.bookingId}`)
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error creating your booking. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const dropoffOptions = locations
  const pickupOptions = locations.filter(loc => loc.id !== bookingData.dropoffLocation && loc.area !== locations.find(l => l.id === bookingData.dropoffLocation)?.area)
  const returnPickupOptions = locations
  const returnDropoffOptions = locations.filter(loc => loc.id !== bookingData.returnPickupLocation && loc.area !== locations.find(l => l.id === bookingData.returnPickupLocation)?.area)

  const isNextButtonDisabled = () => {
    if (!bookingData.pickupLocation || !bookingData.pickupTime) {
      return true
    }
    if (bookingData.isRoundTrip && !bookingData.returnPickupTime) {
      return true
    }
    return false
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 && (
        <Step1DropOff
          dropoffOptions={dropoffOptions}
          selectedDropoff={bookingData.dropoffLocation}
          onLocationSelect={handleLocationSelect}
        />
      )}
      {step === 2 && (
        <>
          <Step2PickUp
            bookingData={bookingData}
            locations={locations}
            pickupOptions={pickupOptions}
            returnPickupOptions={returnPickupOptions}
            returnDropoffOptions={returnDropoffOptions}
            onLocationSelect={handleLocationSelect}
            onInputChange={handleInputChange}
            onSwitchChange={handleSwitchChange}
            onResetReturnTrip={handleResetReturnTrip}
            setStep={setStep}
            setBookingData={setBookingData}
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
          onSelectChange={handleSelectChange}
          onBack={() => setStep(2)}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          selectedVehicle={bookingData.vehicleType}
        />
      )}
    </form>
  )
}