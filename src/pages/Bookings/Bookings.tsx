import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarCheck, Ticket } from "lucide-react";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useFetchEventBookings } from "@/hooks/useFetchEventBookings";
import MyBookingCard from "./components/MyBookingCard";

const MyBookings = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { eventBookings, isEventBookingsLoading } = useFetchEventBookings({
    page,
    perPage,
  });

  return (
    <div className="space-y-4 overflow-y-auto scrollbar-thin p-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CalendarCheck className="size-6 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">
              My Bookings
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            View and manage your event bookings, selected seats, and booking
            status.
          </p>
        </div>

        <Button type="button" variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 size-4" />
          Back
        </Button>
      </div>

      {/* Booking list */}
      {isEventBookingsLoading ? (
        <Loader text="Fetching your bookings..." />
      ) : eventBookings.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Ticket className="size-6 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">No bookings yet</h3>
            <p className="text-sm text-muted-foreground">
              Your event bookings will appear here once you book an event.
            </p>
          </div>
          <Button onClick={() => navigate("/")} variant="outline">
            Explore events
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {eventBookings.map((booking) => (
            <MyBookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Per page:</span>
          <select
            className="rounded-md border bg-background px-2 py-1 text-foreground"
            value={perPage}
            onChange={(event) => {
              setPerPage(Number(event.target.value));
              setPage(1);
            }}
          >
            {[10, 15, 20, 25].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1 || isEventBookingsLoading}
            onClick={() => setPage((current) => current - 1)}
          >
            Previous
          </Button>

          <span className="text-sm tabular-nums">Page {page}</span>

          <Button
            variant="outline"
            size="sm"
            disabled={eventBookings.length < perPage || isEventBookingsLoading}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
