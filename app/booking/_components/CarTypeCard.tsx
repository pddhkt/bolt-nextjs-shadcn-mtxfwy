import { Card, CardContent } from "@/components/ui/card"
import { Car } from 'lucide-react'

interface CarType {
  id: string;
  name: string;
  description: string;
}

interface CarTypeCardProps {
  car: CarType;
  selected: boolean;
  onClick: () => void;
}

export function CarTypeCard({ car, selected, onClick }: CarTypeCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all ${selected ? 'ring-2 ring-primary' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-4 flex flex-col items-center text-center">
        <Car className="w-12 h-12 mb-2" />
        <h3 className="font-semibold">{car.name}</h3>
        <p className="text-sm text-muted-foreground">{car.description}</p>
      </CardContent>
    </Card>
  )
}