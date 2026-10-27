import EventCard from "./components/EventCard";
import { EventActions } from "./components/EventActions";
import { useFetchEvents } from "@/hooks/useFetchEvents";
import Loader from "@/components/shared/Loader";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const { events, isEventsLoading } = useFetchEvents({
    page: page,
    perPage: perPage,
    search: "",
    from_date: today,
  });

  return (
    <div className="scrollbar-thin overflow-y-auto space-y-4 p-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">
          Upcoming Events
        </h2>
        <p className="text-sm text-muted-foreground">
          Get ready for your next experiences. Here is what is coming up next on
          your schedule.
        </p>
      </div>
      {isEventsLoading ? (
        <Loader text="Getting upcoming events..." />
      ) : events.length === 0 ? (
        <h4>No upcoming events</h4>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3  ">
            {events.map((event) => {
              return <EventCard key={event.id} event={event} />;
            })}
          </div>
          <div className="flex items-center justify-between border-t pt-4">
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

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
              >
                Previous
              </Button>

              <span className="text-sm">Page {page}</span>

              <Button
                variant="outline"
                size="sm"
                disabled={events.length < perPage}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
      <EventActions />
    </div>
  );
};

export default HomePage;
