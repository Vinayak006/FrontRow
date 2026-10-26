import { Armchair, Pen, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type VenueRead } from "@/types/venue.types";

interface MyVenueCardProps {
  venue: VenueRead;
}

const MyVenueCard = ({ venue }: MyVenueCardProps) => {
  return (
    <div className="flex flex-col rounded-lg border group">
      <div className="m-4 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold">{venue.name}</h3>

          {/* <span
            className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium capitalize ${
              venue.status === VenueStatus.ACTIVE
                ? "bg-green-100 text-green-700"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {venue.status}
          </span> */}
          <Button
            variant={"ghost"}
            className="group-hover:flex hidden"
            size={"icon"}
          >
            <Pen />
          </Button>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {venue.description || "No description available."}
        </p>
      </div>

      <div className="mx-4 h-px bg-border" />

      <div className="m-4 grid grid-cols-2 gap-4">
        <div className="flex items-start gap-2">
          <Armchair size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium">{venue.capacity} seats</p>
            <p className="text-xs text-muted-foreground">
              {venue.rows} rows × {venue.columns} columns
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin size={16} className="mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">Venue capacity</p>
        </div>

        <div className="flex items-start gap-2">
          <Mail size={16} className="mt-0.5 shrink-0" />
          <p className="break-all text-sm">{venue.contact_email}</p>
        </div>

        <div className="flex items-start gap-2">
          <Phone size={16} className="mt-0.5 shrink-0" />
          <p className="text-sm">{venue.contact_mobile}</p>
        </div>
      </div>
    </div>
  );
};

export default MyVenueCard;
