import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getEvent } from "@/services/event.service";

interface FetchEventsProps {
  id: string | undefined;
}

export const useFetchEvent = ({ id }: FetchEventsProps) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch event");
    }
  }, [isError]);

  return { event: data, isEventLoading: isFetching };
};
