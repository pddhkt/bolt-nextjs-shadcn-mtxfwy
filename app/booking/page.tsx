import { BookingForm } from "./_components/BookingForm";

export default async function BookingPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Book Your Ride</h1>
      <BookingForm />
    </div>
  );
}
