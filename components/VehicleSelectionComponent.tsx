import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface VehicleSelectionComponentProps {
  vehicle: string
  setVehicle: (vehicle: string) => void
}

export default function VehicleSelectionComponent({ vehicle, setVehicle }: VehicleSelectionComponentProps) {
  return (
    <div className="space-y-2">
      <Label>Select Vehicle Type</Label>
      <RadioGroup value={vehicle} onValueChange={setVehicle}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="sedan" id="sedan" />
          <Label htmlFor="sedan">Sedan</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="suv" id="suv" />
          <Label htmlFor="suv">SUV</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="luxury" id="luxury" />
          <Label htmlFor="luxury">Luxury</Label>
        </div>
      </RadioGroup>
    </div>
  )
}