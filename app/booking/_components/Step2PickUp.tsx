import { Clock, Repeat, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { LocationCard } from "./LocationCard";
import { SelectionBox } from "./SelectionBox";
import { BookingData } from "./BookingForm";

interface Location {
  id: string;
  name: string;
  area: "hongkong" | "mainland";
}

interface Step2PickUpProps {
  bookingData: BookingData;
  locations: Location[];
  pickupOptions: Location[];
  returnPickupOptions: Location[];
  returnDropoffOptions: Location[];
  onLocationSelect: (
    locationType: keyof BookingData,
    locationId: string
  ) => void;
  setPickupTime: (time: string) => void;
  setIsRoundTrip: (isRoundTrip: boolean) => void;
  setReturnPickupTime: (time: string) => void;
  onSwitchChange: (checked: boolean) => void;
  onResetReturnTrip: () => void;
  setStep: (step: number) => void;
}

export function Step2PickUp({
  bookingData,
  locations,
  pickupOptions,
  returnPickupOptions,
  returnDropoffOptions,
  onLocationSelect,
  setPickupTime,
  setIsRoundTrip,
  setReturnPickupTime,
  onSwitchChange,
  onResetReturnTrip,
  setStep,
}: Step2PickUpProps) {
  const selectedDropoffLocation = locations.find(
    (loc) => loc.id === bookingData.dropoffLocation
  );
  const selectedPickupLocation = locations.find(
    (loc) => loc.id === bookingData.pickupLocation
  );
  const selectedReturnPickupLocation = locations.find(
    (loc) => loc.id === bookingData.returnPickupLocation
  );
  const selectedReturnDropoffLocation = locations.find(
    (loc) => loc.id === bookingData.returnDropoffLocation
  );

  return (
    <div className="space-y-4">
      <SelectionBox
        title="Destination"
        value={selectedDropoffLocation?.name || "Select destination"}
        onClick={() => setStep(1)}
      />
      <h2 className="text-xl font-semibold mb-4">Where are you now?</h2>
      {bookingData.pickupLocation ? (
        <SelectionBox
          title="Pick-up Point"
          value={selectedPickupLocation?.name || "Select pick-up point"}
          onClick={() => onLocationSelect("pickupLocation", "")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pickupOptions.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              selected={bookingData.pickupLocation === location.id}
              onClick={() => onLocationSelect("pickupLocation", location.id)}
            />
          ))}
        </div>
      )}
      <div className="flex items-center space-x-2 mt-4">
        <Clock className="w-5 h-5" />
        <Input
          type="datetime-local"
          value={bookingData.pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <div className="flex items-center space-x-2 flex-grow">
          <Repeat className="w-5 h-5" />
          <span>Round Trip</span>
          <Switch
            checked={bookingData.isRoundTrip}
            onCheckedChange={(checked) => {
              setIsRoundTrip(checked);
              onSwitchChange(checked);
            }}
          />
        </div>
        {bookingData.isRoundTrip && (
          <Button onClick={onResetReturnTrip} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        )}
      </div>
      {bookingData.isRoundTrip && (
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-medium">Return Trip Details</h3>
          <div className="space-y-4">
            {bookingData.returnPickupLocation ? (
              <SelectionBox
                title="Return Pick-up Point"
                value={
                  selectedReturnPickupLocation?.name ||
                  "Select return pick-up point"
                }
                onClick={() => onLocationSelect("returnPickupLocation", "")}
              />
            ) : (
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Return Pick-up Point
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {returnPickupOptions.map((location) => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      selected={
                        bookingData.returnPickupLocation === location.id
                      }
                      onClick={() =>
                        onLocationSelect("returnPickupLocation", location.id)
                      }
                    />
                  ))}
                </div>
              </div>
            )}
            {bookingData.returnDropoffLocation ? (
              <SelectionBox
                title="Return Drop-off Point"
                value={
                  selectedReturnDropoffLocation?.name ||
                  "Select return drop-off point"
                }
                onClick={() => onLocationSelect("returnDropoffLocation", "")}
              />
            ) : (
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Return Drop-off Point
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {returnDropoffOptions.map((location) => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      selected={
                        bookingData.returnDropoffLocation === location.id
                      }
                      onClick={() =>
                        onLocationSelect("returnDropoffLocation", location.id)
                      }
                    />
                  ))}
                </div>
              </div>
            )}
            <div>
              <h4 className="text-sm font-medium mb-2">Return Date</h4>
              <Input
                type="datetime-local"
                value={bookingData.returnPickupTime}
                onChange={(e) => setReturnPickupTime(e.target.value)}
                required={bookingData.isRoundTrip}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
