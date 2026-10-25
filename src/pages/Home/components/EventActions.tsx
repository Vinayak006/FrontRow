import { ArrowRight, CalendarPlus, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

export const EventActions = () => {
  return (
    <section className="p-4 rounded-xl border  space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Grow with FrontRow</h2>
        <p className="text-sm text-muted-foreground">
          Have a venue or an event idea? Let's make it happen.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-lg border p-4 space-y-2">
          <MapPin size={24} />
          <h3 className="font-semibold">Add a venue</h3>
          <p className="text-sm text-muted-foreground">
            List your venue and connect with event organizers.
          </p>
          <Button className="w-full">
            Add venue <ArrowRight size={16} />
          </Button>
        </div>

        <div className="rounded-lg border p-4 space-y-2">
          <CalendarPlus size={24} />
          <h3 className="font-semibold">Host an event</h3>
          <p className="text-sm text-muted-foreground">
            Create an event and reach your local audience.
          </p>
          <Button className="w-full">
            Host event <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};
