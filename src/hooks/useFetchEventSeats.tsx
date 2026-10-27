import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getEventSeats } from "@/services/event.service";

interface FetchEventSeatsProps {
  id: number;
  date: string;
}

export const useFetchEventSeats = ({ id, date }: FetchEventSeatsProps) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["event-seats", id, date],
    queryFn: () => getEventSeats(id, date),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch event seat map view");
    }
  }, [isError]);

  return { eventSeats: data || [], isEventSeatsLoading: isFetching };
};
