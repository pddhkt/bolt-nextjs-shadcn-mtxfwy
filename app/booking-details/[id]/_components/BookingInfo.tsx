import React from 'react';
import { Booking } from '../page';

export function BookingInfo({ booking }: { booking: Booking }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem label="Booking ID" value={booking.id.toString()} />
        <InfoItem label="User ID" value={booking.userId} />
        <InfoItem label="Pickup Location" value={booking.pickupLocation} />
        <InfoItem label="Dropoff Location" value={booking.dropoffLocation} />
        <InfoItem label="Pickup Time" value={new Date(booking.pickupTime).toLocaleString()} />
        <InfoItem label="Vehicle Type" value={booking.vehicleType} />
        <InfoItem label="Status" value={booking.status} />
        <InfoItem label="Round Trip" value={booking.isRoundTrip ? 'Yes' : 'No'} />
      </div>
      {booking.isRoundTrip && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Return Trip Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Return Pickup Location" value={booking.returnPickupLocation} />
            <InfoItem label="Return Dropoff Location" value={booking.returnDropoffLocation} />
            <InfoItem 
              label="Return Pickup Time" 
              value={booking.returnPickupTime ? new Date(booking.returnPickupTime).toLocaleString() : 'N/A'} 
            />
          </div>
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <InfoItem 
          label="Created At" 
          value={booking.createdAt ? new Date(booking.createdAt).toLocaleString() : 'N/A'} 
        />
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-base text-gray-800">{value}</span>
    </div>
  );
}