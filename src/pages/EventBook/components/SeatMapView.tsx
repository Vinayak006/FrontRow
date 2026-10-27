import Loader from "@/components/shared/Loader";
import { useFetchEventSeats } from "@/hooks/useFetchEventSeats";
import React from "react";

interface SeatMapViewProps {
  event_id: number;
  event_date: string;
  venue_cols: number;
  venue_rows: number;
  selectedSeatIds: number[];
  onSeatSelectionChange: (ids: number[]) => void;
}

const SeatMapView: React.FC<SeatMapViewProps> = ({
  event_date,
  event_id,
  venue_cols,
  venue_rows,
  selectedSeatIds,
  onSeatSelectionChange,
}) => {
  const { eventSeats, isEventSeatsLoading } = useFetchEventSeats({
    id: event_id,
    date: event_date,
  });

  if (isEventSeatsLoading) {
    return <Loader text="Loading seat map view" />;
  }

  if (!eventSeats) {
    return <h4>Failed to load seat map view</h4>;
  }

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${venue_cols}, 1fr)`,
        gridTemplateRows: `repeat(${venue_rows},  1fr)`,
      }}
    >
      {eventSeats.map((seat) => {
        const isUnavailable = seat.status !== "available";
        const isSelected = selectedSeatIds.includes(seat.id);

        return (
          <div className="flex flex-col items-center" key={seat.id}>
            <input
              type="checkbox"
              checked={isUnavailable || isSelected}
              disabled={isUnavailable}
              readOnly={true}
              onChange={(e) => {
                onSeatSelectionChange(
                  e.target.checked
                    ? [...selectedSeatIds, seat.id]
                    : selectedSeatIds.filter((id) => id !== seat.id),
                );
              }}
              className="size-8 cursor-pointer"
            />
            <p className="text-sm text-muted-foreground">{seat.seat_number}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SeatMapView;
