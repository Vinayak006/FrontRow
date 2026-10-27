import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getEventBookingDetail } from "@/services/event.service";

interface FetchEventBookingDetailProps {
  id: string | undefined;
}

export const useFetchEventBookingDetail = ({
  id,
}: FetchEventBookingDetailProps) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["event-booking", id],
    queryFn: () => getEventBookingDetail(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch event booking detail");
    }
  }, [isError]);

  return { eventBooking: data, isEventBookingLoading: isFetching };
};
