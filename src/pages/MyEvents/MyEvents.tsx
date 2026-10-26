import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import MyEventCard from "./components/MyEventCard";
import { useFetchEvents } from "@/hooks/useFetchEvents";

const MyEvents = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { events, isEventsLoading } = useFetchEvents({
    page,
    perPage,
    search: "",
  });

  return (
    <div className="scrollbar-thin overflow-y-auto space-y-6 px-4 py-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Hosted Events
          </h1>
          <p className="text-sm text-muted-foreground">
            View and manage your entire history of past, current, and upcoming
            hosted events.
          </p>
        </div>

        <Button type="button" variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
      </div>
      {isEventsLoading ? (
        <Loader text="Fetching your events..." />
      ) : events.length === 0 ? (
        <h4 className="italic">No events found</h4>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <MyEventCard key={event.id} event={event} />
          ))}
        </div>
      )}

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
    </div>
  );
};

export default MyEvents;
