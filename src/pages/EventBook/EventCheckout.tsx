import {
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  Armchair,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useFetchEventBookingDetail } from "@/hooks/useFetchEventBookingDetail";
import { useCheckoutEventBooking } from "@/hooks/useCheckoutEventBooking";

const EventCheckout = () => {
  const { booking_id } = useParams();
  const navigate = useNavigate();

  const { eventBooking, isEventBookingLoading } = useFetchEventBookingDetail({
    id: booking_id,
  });

  const { mutateEventBookingCheckout, isCheckoutPending } =
    useCheckoutEventBooking({
      onSuccess() {
        navigate("/", { replace: true });
      },
    });

  const handleCheckout = (booking_id: number) => {
    mutateEventBookingCheckout(booking_id);
  };

  if (isEventBookingLoading) {
    return <Loader text="Fetching event booking detail" />;
  }

  if (!eventBooking) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Failed to load booking details.
        </p>
      </div>
    );
  }

  const { event, seats, event_date, status, id } = eventBooking;

  const seatCount = seats.length;
  const ticketPrice = Number(event.base_price);
  const totalAmount = ticketPrice * seatCount;

  const formattedDate = format(
    new Date(`${event_date}T00:00:00`),
    "EEE, dd MMM yyyy",
  );

  const formatTime = (time: string) =>
    format(new Date(`1970-01-01T${time}`), "h:mm a");

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="flex scrollbar-thin overflow-y-auto flex-col">
      <main className="flex-1 space-y-6 px-4 py-6 pb-8 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div>
          <p className="text-sm text-muted-foreground">Events / Booking</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Review your booking
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Check your event and seat details before proceeding to checkout.
          </p>
        </div>

        {/* Event details */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="font-semibold">Event details</h2>
          </div>

          <div className="space-y-5 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-xl font-bold">{event.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {event.description || "No event description available."}
                </p>
              </div>

              <span className="w-fit shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
                {event.category.replaceAll("-", " ")}
              </span>
            </div>

            <div className="grid gap-4 border-t border-gray-200 pt-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Event date</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formattedDate}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {format(new Date(`${event.from_date}T00:00:00`), "dd MMM")}
                    {" – "}
                    {format(
                      new Date(`${event.to_date}T00:00:00`),
                      "dd MMM yyyy",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Event time</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatTime(event.from_time)}
                    {" – "}
                    {formatTime(event.to_time)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">{event.venue.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking and seats */}
        <section className="rounded-xl border border-gray-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold">Booking summary</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Booking ID: #{id}
              </p>
            </div>

            <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-medium capitalize text-amber-700">
              {status.replaceAll("_", " ")}
            </span>
          </div>

          <div className="space-y-5 p-5">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Ticket className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  {seatCount} {seatCount === 1 ? "ticket" : "tickets"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formattedDate}
                </p>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium">Selected seats</h3>
                <span className="text-xs text-muted-foreground">
                  {seatCount} selected
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {seats.map((seat) => (
                  <div
                    key={seat.id}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                  >
                    <Armchair className="size-4 text-primary" />
                    <span className="text-sm font-medium">
                      Seat {seat.seat_number}
                    </span>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs capitalize text-amber-700">
                      {seat.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <p className="text-xs leading-5 text-muted-foreground">
                Your booking is currently{" "}
                <span className="font-medium capitalize">{status}</span>.
                Complete checkout to continue with your reservation.
              </p>
            </div>
          </div>
        </section>

        {/* Price breakdown */}
        <section className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="font-semibold">Price breakdown</h2>

          <div className="mt-4 space-y-3">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">
                Ticket price × {seatCount}
              </span>
              <span>{formatCurrency(ticketPrice * seatCount)}</span>
            </div>

            <div className="flex justify-between gap-4 border-t border-gray-200 pt-4">
              <span className="font-semibold">Total amount</span>
              <span className="text-lg font-bold">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Taxes or additional fees, if applicable, will be shown during
            checkout.
          </p>
        </section>
      </main>

      {/* Bottom checkout bar */}
      <div className="sticky bottom-0 border-t border-gray-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total amount</p>
            <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
            <p className="text-xs text-muted-foreground">
              {seatCount} {seatCount === 1 ? "ticket" : "tickets"}
            </p>
          </div>

          <Button
            className="w-full sm:w-auto sm:min-w-56"
            size="lg"
            disabled={seatCount === 0 || isCheckoutPending}
            onClick={() => {
              handleCheckout(eventBooking.id);
            }}
          >
            {isCheckoutPending ? <Loader /> : <>Proceed to checkout</>}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCheckout;
