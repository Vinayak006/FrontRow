import {
  CalendarDays,
  Clock,
  MapPin,
  Mail,
  Phone,
  IndianRupee,
  Pen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { type EventRead } from "@/types/event.types";

interface MyEventCardProps {
  event: EventRead;
}

const MyEventCard = ({ event }: MyEventCardProps) => {
  return (
    <div className="group flex flex-col rounded-lg border">
      <div className="m-4 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold">{event.name}</h3>

          <Button
            variant="ghost"
            className="hidden group-hover:flex"
            size="icon"
          >
            <Pen />
          </Button>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {event.description || "No description available."}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium capitalize">
            {event.category.replaceAll("-", " ")}
          </span>

          <span
            className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${
              event.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {event.status}
          </span>
        </div>
      </div>

      <div className="mx-4 h-px bg-border" />

      <div className="m-4 grid grid-cols-2 gap-4">
        <div className="flex items-start gap-2">
          <CalendarDays size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium">{event.from_date}</p>
            <p className="text-xs text-muted-foreground">To {event.to_date}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Clock size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium">
              {event.from_time} – {event.to_time}
            </p>
            <p className="text-xs text-muted-foreground">Event time</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium">{event.venue.name}</p>
            <p className="text-xs text-muted-foreground">{event.location}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <IndianRupee size={16} className="mt-0.5 shrink-0" />
          <p className="text-sm font-medium">
            {event.base_price.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="flex items-start gap-2">
          <Mail size={16} className="mt-0.5 shrink-0" />
          <p className="break-all text-sm">{event.contact_email}</p>
        </div>

        <div className="flex items-start gap-2">
          <Phone size={16} className="mt-0.5 shrink-0" />
          <p className="text-sm">{event.contact_mobile}</p>
        </div>
      </div>
    </div>
  );
};

export default MyEventCard;
