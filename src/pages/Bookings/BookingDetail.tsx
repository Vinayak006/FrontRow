import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  Armchair,
  Mail,
  Phone,
} from "lucide-react";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useFetchEventBookingDetail } from "@/hooks/useFetchEventBookingDetail";

const BookingDetail = () => {
  const navigate = useNavigate();
  const { booking_id } = useParams();

  const { eventBooking, isEventBookingLoading } = useFetchEventBookingDetail({
    id: booking_id,
  });

  if (isEventBookingLoading) {
    return <Loader text="Fetching booking details..." />;
  }

  if (!eventBooking) {
    return (
      <div className="flex  flex-col items-center justify-center gap-3">
        <Ticket className="size-10 text-muted-foreground" />
        <h2 className="font-semibold">Booking not found</h2>
        <p className="text-sm text-muted-foreground">
          We couldn't find the requested booking.
        </p>
        <Button variant="outline" onClick={() => navigate("/bookings")}>
          <ArrowLeft className="mr-2 size-4" />
          Back to bookings
        </Button>
      </div>
    );
  }

  const { id, event, event_date, seats, status } = eventBooking;

  const formatTime = (time: string) =>
    format(new Date(`1970-01-01T${time}`), "h:mm a");

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  const statusStyles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700",
    confirmed: "bg-green-50 text-green-700",
    cancelled: "bg-red-50 text-red-700",
  };

  const totalAmount = Number(event.base_price) * seats.length;

  return (
    <div className="overflow-y-auto scrollbar-thin space-y-6 px-4 py-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Booking details
          </h1>
          <p className="text-sm text-muted-foreground">
            Review your reservation and event information.
          </p>
        </div>

        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 size-4" />
          My bookings
        </Button>
      </div>

      {/* Booking status */}
      <section className="rounded-xl border  p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Booking reference</p>
            <h2 className="mt-1 text-xl font-semibold">#{id}</h2>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${
              statusStyles[status] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {status.replaceAll("_", " ")}
          </span>
        </div>

        <div className="mt-5 grid gap-4 border-t pt-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Event date</p>
            <p className="mt-1 font-medium">
              {format(new Date(`${event_date}T00:00:00`), "EEEE, dd MMMM yyyy")}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Number of seats</p>
            <p className="mt-1 font-medium">
              {seats.length} {seats.length === 1 ? "seat" : "seats"}
            </p>
          </div>
        </div>
      </section>

      {/* Event information */}
      <section className="overflow-hidden rounded-xl border ">
        <div className="border-b p-5">
          <p className="text-sm text-muted-foreground">Your event</p>
          <h2 className="mt-1 text-xl font-semibold">{event.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {event.description || "No event description available."}
          </p>
          <span className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
            {event.category.replaceAll("-", " ")}
          </span>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
            <div>
              <p className="font-medium">Event date</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {format(new Date(`${event.from_date}T00:00:00`), "dd MMM yyyy")}
                {" – "}
                {format(new Date(`${event.to_date}T00:00:00`), "dd MMM yyyy")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Your booking is for{" "}
                {format(new Date(`${event_date}T00:00:00`), "dd MMM yyyy")}.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
            <div>
              <p className="font-medium">Event time</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatTime(event.from_time)} – {formatTime(event.to_time)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
            <div>
              <p className="font-medium">{event.venue.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {event.location}
              </p>
            </div>
          </div>

          <div className="grid gap-4 border-t pt-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-sm font-medium">Event contact</p>
                <a
                  href={`mailto:${event.contact_email}`}
                  className="break-all text-sm text-muted-foreground hover:text-primary"
                >
                  {event.contact_email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Contact number</p>
                <a
                  href={`tel:${event.contact_mobile}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {event.contact_mobile}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seats */}
      <section className="rounded-xl border ">
        <div className="border-b p-5">
          <h2 className="font-semibold">Booked seats</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Seat information for this reservation.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 p-5">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3"
            >
              <Armchair className="size-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Seat {seat.seat_number}</p>
                <p className="text-xs capitalize text-muted-foreground">
                  {seat.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Price summary */}
      <section className="rounded-xl border  p-5">
        <h2 className="font-semibold">Payment summary</h2>

        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">
            Ticket price × {seats.length}
          </span>
          <span>{formatCurrency(Number(event.base_price) * seats.length)}</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <span className="font-semibold">Total amount</span>
          <span className="text-xl font-bold">
            {formatCurrency(totalAmount)}
          </span>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          This total is calculated from the event's base price and booked seats.
          Any additional fees are not included.
        </p>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-3 pb-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back to bookings
        </Button>

        {status === "pending" && (
          <Button onClick={() => navigate(`/event/bookings/${id}`)}>
            Proceed to checkout
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingDetail;
