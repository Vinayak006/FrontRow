import { Calendar, MapPin } from "lucide-react";

import EventImage from "/src/assets/event.jpg";

interface EventCardProps {
  name: string;
  description: string;
  location: string;
}

const EventCard: React.FC<EventCardProps> = ({
  description,
  location,
  name,
}) => {
  return (
    <div className="flex flex-col border  rounded-lg">
      <img
        src={EventImage}
        alt="Event image"
        className="aspect-video object-cover rounded-t-lg"
      />

      <div className="space-y-1 m-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="h-px bg-border mx-4"></div>

      <div className="grid grid-cols-2 gap-4 m-4">
        <div className="flex items-start gap-2">
          <Calendar size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium">12 Jul</p>
            <p className="text-xs text-muted-foreground">4:00 – 5:00 PM</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin size={16} className="mt-0.5 shrink-0" />
          <p className="text-sm font-medium">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
