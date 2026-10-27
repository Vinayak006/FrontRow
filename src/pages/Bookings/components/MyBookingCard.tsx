import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import type { EventBookingRead } from "@/types/event.types";

interface MyBookingCardProps {
  booking: EventBookingRead;
}

const MyBookingCard = ({ booking }: MyBookingCardProps) => {
  const navigate = useNavigate();
  const { event, event_date, seats, status, id } = booking;

  const formatTime = (time: string) =>
    format(new Date(`1970-01-01T${time}`), "h:mm a");

  const statusStyles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700",
    confirmed: "bg-green-50 text-green-700",
    cancelled: "bg-red-50 text-red-700",
  };

  return (
    <div className="flex flex-col rounded-xl border bg-card transition-shadow hover:shadow-md">
      {/* Card header */}
      <div className="space-y-3 border-b p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 font-semibold leading-6">{event.name}</h3>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
              statusStyles[status] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {status.replaceAll("_", " ")}
          </span>
        </div>

        <p className="text-xs text-muted-foreground">Booking #{id}</p>
      </div>

      {/* Event details */}
      <div className="flex-1 space-y-4 p-4">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">
              {format(new Date(`${event_date}T00:00:00`), "EEE, dd MMM yyyy")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatTime(event.from_time)} – {formatTime(event.to_time)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{event.venue.name}</p>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {event.location}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Ticket className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">
              {seats.length} {seats.length === 1 ? "seat" : "seats"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {seats.map((seat) => seat.seat_number).join(", ")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-sm text-muted-foreground">
            Total ticket price
          </span>
          <span className="font-semibold">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 2,
            }).format(Number(event.base_price) * seats.length)}
          </span>
        </div>
      </div>

      {/* Card action */}
      <div className="border-t p-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate(`/my-bookings/${id}`)}
        >
          View booking details
        </Button>
      </div>
    </div>
  );
};

export default MyBookingCard;
