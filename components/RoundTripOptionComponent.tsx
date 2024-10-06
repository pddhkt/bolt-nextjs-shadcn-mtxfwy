import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface RoundTripOptionComponentProps {
  isRoundTrip: boolean
  setIsRoundTrip: (isRoundTrip: boolean) => void
}

export default function RoundTripOptionComponent({ isRoundTrip, setIsRoundTrip }: RoundTripOptionComponentProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="round-trip"
        checked={isRoundTrip}
        onCheckedChange={setIsRoundTrip}
      />
      <Label htmlFor="round-trip">Round Trip</Label>
    </div>
  )
}