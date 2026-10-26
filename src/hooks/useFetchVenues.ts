import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getVenues } from "../services/venue.service";

interface FetchVenuesProps {
  page: number;
  perPage: number;
  search: string;
}

export const useFetchVenues = ({ page, perPage, search }: FetchVenuesProps) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["venues", page, perPage, search],
    queryFn: () => getVenues(page, perPage, search),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch venues");
    }
  }, [isError]);

  return { venues: data || [], isVenuesLoading: isFetching };
};
