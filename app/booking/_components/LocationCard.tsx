import { Card, CardContent } from "@/components/ui/card"

interface Location {
  id: string;
  name: string;
  area: 'hongkong' | 'mainland';
}

interface LocationCardProps {
  location: Location;
  selected: boolean;
  onClick: () => void;
}

export function LocationCard({ location, selected, onClick }: LocationCardProps) {
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