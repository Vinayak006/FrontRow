import EventCard from "./components/EventCard";
import { EventActions } from "./components/EventActions";
import { useFetchEvents } from "@/hooks/useFetchEvents";
import Loader from "@/components/shared/Loader";
import { format } from "date-fns";

const HomePage = () => {
  const today = format(new Date(), "yyyy-MM-dd");

  const { events, isEventsLoading } = useFetchEvents({
    page: 1,
    perPage: 5,
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
        <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3  ">
          {events.map((event) => {
            return <EventCard key={event.id} event={event} />;
          })}
        </div>
      )}
      <div className="h-px bg-border" />
      <EventActions />
    </div>
  );
};

export default HomePage;
