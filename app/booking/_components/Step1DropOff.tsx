import { BookingData } from './BookingForm';
import { LocationCard } from './LocationCard'

interface Location {
  id: string;
  name: string;
  area: 'hongkong' | 'mainland';
}

interface Step1DropOffProps {
  dropoffOptions: Location[];
  selectedDropoff: string;
  onLocationSelect: (locationType: keyof BookingData, locationId: string) => void;
}

export function Step1DropOff({ dropoffOptions, selectedDropoff, onLocationSelect }: Step1DropOffProps) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Where do you want to go?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dropoffOptions.map(location => (
          <LocationCard
            key={location.id}
            location={location}
            selected={selectedDropoff === location.id}
            onClick={() => onLocationSelect('dropoffLocation', location.id)}
          />
        ))}
      </div>
    </>
  )
}