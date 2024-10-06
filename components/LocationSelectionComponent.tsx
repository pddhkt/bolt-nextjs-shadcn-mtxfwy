import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface LocationSelectionComponentProps {
  location: string
  setLocation: (location: string) => void
}

export default function LocationSelectionComponent({ location, setLocation }: LocationSelectionComponentProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="location">Pickup Location</Label>
      <Input
        id="location"
        placeholder="Enter pickup location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
  )
}