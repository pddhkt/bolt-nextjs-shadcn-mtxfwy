'use client'

import { useState, useEffect } from 'react'
import { MapPin, Clock, Repeat, Truck, CheckSquare, DollarSign, AlertCircle, RotateCcw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"

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

interface BookingData {
  dropOffPoint: string;
  pickUpPoint: string;
  bookingDate: string;
  roundTrip: boolean;
  returnDropOffPoint: string;
  returnPickUpPoint: string;
  returnDate: string;
  paymentInfo: object;
  vehicleSelection: string;
}

function LocationCard({ location, selected, onClick }: { location: Location; selected: boolean; onClick: () => void }) {
  return (
    <Card 
      className={`cursor-pointer transition-all ${selected ? 'ring-2 ring-primary' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <h3 className="font-semibold">{location.name}</h3>
        <p className="text-sm text-muted-foreground">{location.area === 'hongkong' ? 'Hong Kong' : 'Mainland China'}</p>
      </CardContent>
    </Card>
  )
}

function SelectionBox({ title, value, onClick }: { title: string; value: string; onClick: () => void }) {
  return (
    <Card className="cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-lg font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}

export default function BookingPage() {
  const [bookingData, setBookingData] = useState<BookingData>({
    dropOffPoint: '',
    pickUpPoint: '',
    bookingDate: '',
    roundTrip: false,
    returnDropOffPoint: '',
    returnPickUpPoint: '',
    returnDate: '',
    paymentInfo: {},
    vehicleSelection: '',
  })
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (bookingData.roundTrip && bookingData.pickUpPoint && bookingData.dropOffPoint) {
      setBookingData(prev => ({
        ...prev,
        returnDropOffPoint: prev.pickUpPoint,
        returnPickUpPoint: prev.dropOffPoint,
      }))
    }
  }, [bookingData.roundTrip, bookingData.pickUpPoint, bookingData.dropOffPoint])

  const handleLocationSelect = (locationType: keyof BookingData, locationId: string) => {
    setBookingData(prev => ({ ...prev, [locationType]: locationId }))
    if (locationType === 'dropOffPoint' && step === 1) {
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
    setBookingData(prev => ({ ...prev, roundTrip: checked }))
  }

  const handleResetReturnTrip = () => {
    setBookingData(prev => ({
      ...prev,
      returnDropOffPoint: prev.pickUpPoint,
      returnPickUpPoint: prev.dropOffPoint,
      returnDate: '',
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Booking Confirmed",
        description: `Your booking ID is ${Math.random().toString(36).substr(2, 9)}`,
      })
      // Reset form or navigate to confirmation page
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error creating your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const dropOffOptions = locations
  const pickUpOptions = locations.filter(loc => loc.id !== bookingData.dropOffPoint && loc.area !== locations.find(l => l.id === bookingData.dropOffPoint)?.area)
  const returnPickUpOptions = locations
  const returnDropOffOptions = locations.filter(loc => loc.id !== bookingData.returnPickUpPoint && loc.area !== locations.find(l => l.id === bookingData.returnPickUpPoint)?.area)

  const selectedDropOffLocation = locations.find(loc => loc.id === bookingData.dropOffPoint)
  const selectedPickUpLocation = locations.find(loc => loc.id === bookingData.pickUpPoint)
  const selectedReturnPickUpLocation = locations.find(loc => loc.id === bookingData.returnPickUpPoint)
  const selectedReturnDropOffLocation = locations.find(loc => loc.id === bookingData.returnDropOffPoint)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Book Your Ride</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Where do you want to go?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dropOffOptions.map(location => (
                <LocationCard
                  key={location.id}
                  location={location}
                  selected={bookingData.dropOffPoint === location.id}
                  onClick={() => handleLocationSelect('dropOffPoint', location.id)}
                />
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-4">
              <SelectionBox
                title="Destination"
                value={selectedDropOffLocation?.name || 'Select destination'}
                onClick={() => setStep(1)}
              />
              <h2 className="text-xl font-semibold mb-4">Where are you now?</h2>
              {bookingData.pickUpPoint ? (
                <SelectionBox
                  title="Pick-up Point"
                  value={selectedPickUpLocation?.name || 'Select pick-up point'}
                  onClick={() => setBookingData(prev => ({ ...prev, pickUpPoint: '' }))}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pickUpOptions.map(location => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      selected={bookingData.pickUpPoint === location.id}
                      onClick={() => handleLocationSelect('pickUpPoint', location.id)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Clock className="w-5 h-5" />
              <Input
                type="datetime-local"
                name="bookingDate"
                value={bookingData.bookingDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <div className="flex items-center space-x-2 flex-grow">
                <Repeat className="w-5 h-5" />
                <span>Round Trip</span>
                <Switch
                  checked={bookingData.roundTrip}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
              {bookingData.roundTrip && (
                <Button onClick={handleResetReturnTrip} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              )}
            </div>
            {bookingData.roundTrip && (
              <div className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Return Trip Details</h3>
                <div className="space-y-4">
                  {bookingData.returnPickUpPoint ? (
                    <SelectionBox
                      title="Return Pick-up Point"
                      value={selectedReturnPickUpLocation?.name || 'Select return pick-up point'}
                      onClick={() => setBookingData(prev => ({ ...prev, returnPickUpPoint: '' }))}
                    />
                  ) : (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Return Pick-up Point</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {returnPickUpOptions.map(location => (
                          <LocationCard
                            key={location.id}
                            location={location}
                            selected={bookingData.returnPickUpPoint === location.id}
                            onClick={() => handleLocationSelect('returnPickUpPoint', location.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {bookingData.returnDropOffPoint ? (
                    <SelectionBox
                      title="Return Drop-off Point"
                      value={selectedReturnDropOffLocation?.name || 'Select return drop-off point'}
                      onClick={() => setBookingData(prev => ({ ...prev, returnDropOffPoint: '' }))}
                    />
                  ) : (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Return Drop-off Point</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {returnDropOffOptions.map(location => (
                          <LocationCard
                            key={location.id}
                            location={location}
                            selected={bookingData.returnDropOffPoint === location.id}
                            onClick={() => handleLocationSelect('returnDropOffPoint', location.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Return Date</h4>
                    <Input
                      type="datetime-local"
                      name="returnDate"
                      value={bookingData.returnDate}
                      onChange={handleInputChange}
                      required={bookingData.roundTrip}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="space-x-2 mt-4">
              <Button onClick={() => setStep(3)} disabled={!bookingData.pickUpPoint || !bookingData.bookingDate}>Next</Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5" />
              <Select onValueChange={(value) => handleSelectChange('vehicleSelection', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-5 h-5" />
              <span>I agree to the terms and conditions</span>
              <input type="checkbox" required />
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Estimated Price: $XX.XX</span>
            </div>
            <div className="flex items-center space-x-2 text-yellow-500">
              <AlertCircle className="w-5 h-5" />
              <span>Prices may increase during peak hours</span>
            </div>
            <div className="space-x-2">
              <Button onClick={() => setStep(2)}>Back</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}