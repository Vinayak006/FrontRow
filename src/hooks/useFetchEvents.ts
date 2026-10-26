import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getEvents } from "@/services/event.service";

interface FetchEventsProps {
  page: number;
  perPage: number;
  search: string;
  owned?: boolean;
  from_date?: string;
}

export const useFetchEvents = ({
  page,
  perPage,
  search,
  from_date,
  owned = false,
}: FetchEventsProps) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["events", page, perPage, search, owned, from_date],
    queryFn: () => getEvents(page, perPage, search, owned, from_date),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch events");
    }
  }, [isError]);

  return { events: data || [], isEventsLoading: isFetching };
};
