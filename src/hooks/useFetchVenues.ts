import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getVenues } from "../services/venue.service";

interface FetchVenuesProps {
  page: number;
  perPage: number;
  search: string;
  owned: boolean;
}

export const useFetchVenues = ({
  page,
  perPage,
  search,
  owned = false,
}: FetchVenuesProps) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["venues", page, perPage, search, owned],
    queryFn: () => getVenues(page, perPage, search, owned),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch venues");
    }
  }, [isError]);

  return { venues: data || [], isVenuesLoading: isFetching };
};
