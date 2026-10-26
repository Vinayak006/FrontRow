import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";

import EventImage from "/src/assets/event.jpg";
import type { EventRead } from "@/types/event.types";

interface EventCardProps {
  event: EventRead;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="flex flex-col border  rounded-lg hover:cursor-pointer hover:border-primary hover:bg-primary-foreground">
      <img
        src={EventImage}
        alt="Event image"
        className="aspect-video object-cover rounded-t-lg"
      />

      <div className="space-y-1 m-4">
        <h3 className="text-lg font-semibold">{event.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>
      </div>

      <div className="h-px bg-border mx-4"></div>

      <div className="grid grid-cols-2 gap-4 m-4">
        <div className="flex items-start gap-2">
          <Calendar size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium">
              {format(new Date(event.from_date), "dd MMM")}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(`1970-01-01T${event.from_time}`), "h:mm a")}
              {" – "}
              {format(new Date(`1970-01-01T${event.to_time}`), "h:mm a")}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin size={16} className="mt-0.5 shrink-0" />
          <p className="text-sm font-medium">{event.location}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
