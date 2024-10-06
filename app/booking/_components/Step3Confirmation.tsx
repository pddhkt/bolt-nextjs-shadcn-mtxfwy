import { CheckSquare, DollarSign, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { CarTypeCard } from './CarTypeCard'

interface CarType {
  id: string;
  name: string;
  description: string;
}

interface Step3ConfirmationProps {
  onSelectChange: (name: string, value: string) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  selectedVehicle: string;
}

const carOptions: CarType[] = [
  { id: 'standard', name: 'Standard', description: 'Comfortable and economical' },
  { id: 'premium', name: 'Premium', description: 'Extra features and space' },
  { id: 'luxury', name: 'Luxury', description: 'Top-tier comfort and style' },
];

export function Step3Confirmation({ onSelectChange, onBack, onSubmit, isLoading, selectedVehicle }: Step3ConfirmationProps) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Select your vehicle type</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {carOptions.map(car => (
          <CarTypeCard
            key={car.id}
            car={car}
            selected={selectedVehicle === car.id}
            onClick={() => onSelectChange('vehicleType', car.id)}
          />
        ))}
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <CheckSquare className="w-5 h-5" />
        <span>I agree to the terms and conditions</span>
        <input type="checkbox" required />
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <DollarSign className="w-5 h-5" />
        <span>Estimated Price: $XX.XX</span>
      </div>
      <div className="flex items-center space-x-2 text-yellow-500 mb-6">
        <AlertCircle className="w-5 h-5" />
        <span>Prices may increase during peak hours</span>
      </div>
      <div className="space-x-2">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </div>
    </>
  )
}