import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getEventBookings } from "@/services/event.service";

interface FetchEventBookingsProps {
  page: number;
  perPage: number;
}

export const useFetchEventBookings = ({
  page,
  perPage,
}: FetchEventBookingsProps) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["event-bookings", page, perPage],
    queryFn: () => getEventBookings(page, perPage),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch event bookings");
    }
  }, [isError]);

  return { eventBookings: data || [], isEventBookingsLoading: isFetching };
};
