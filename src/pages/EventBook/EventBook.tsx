import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import SeatMapView from "./components/SeatMapView";
import { useFetchEvent } from "@/hooks/useFetchEvent";
import { useEventSeatHold } from "@/hooks/useEventSeatHold";
import type { EventRead } from "@/types/event.types";

const EventBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>([]);

  const { event, isEventLoading } = useFetchEvent({ id });

  const { isEventSeatHoldPending, mutateEventSeatHold } = useEventSeatHold({
    onSuccess(res) {
      navigate(`/event/bookings/${res.booking_id}`);
    },
  });

  const onSubmit = (event: EventRead) => {
    mutateEventSeatHold({
      event_id: event.id,
      event_date: event.from_date,
      seat_ids: selectedSeatIds,
    });
  };

  if (isEventLoading) {
    return <Loader text="Fetching event" />;
  }

  if (!event) {
    return <h4>Something went wrong while fetching event</h4>;
  }

  return (
    <div className="scrollbar-thin overflow-y-auto flex flex-col px-4 py-2 space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <h2 className="font-semibold text-lg">{event.name}</h2>
        <div className="px-2 rounded-full text-sm bg-primary text-primary-foreground">
          {event.category}
        </div>
      </div>
      <h5 className="italic flex items-center justify-center ">
        [Front facing side]
      </h5>
      <div className="w-full flex-1 overflow-auto scrollbar-thin border border-gray-200 rounded-lg p-4 bg-gray-50">
        <SeatMapView
          event_id={event.id}
          event_date={event.from_date}
          venue_cols={event.venue.columns}
          venue_rows={event.venue.rows}
          selectedSeatIds={selectedSeatIds}
          onSeatSelectionChange={(ids: number[]) => {
            setSelectedSeatIds(ids);
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p>
            {selectedSeatIds.length} x {event.base_price}
          </p>
          <h3 className="font-semibold">
            Total: {selectedSeatIds.length * event.base_price}
          </h3>
        </div>
        <Button
          disabled={isEventSeatHoldPending}
          onClick={() => onSubmit(event)}
        >
          {isEventSeatHoldPending ? <Loader /> : <>Book seats</>}
        </Button>
      </div>
    </div>
  );
};

export default EventBook;
