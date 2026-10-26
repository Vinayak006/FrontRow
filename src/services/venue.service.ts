import { api } from "./api";
import { ENDPOINTS } from "@/const/endpoints";
import type { VenueFormValues } from "../pages/VenueForm/helpers/zod/venue";
import type { VenueRead, Venues } from "@/types/venue.types";

export const createVenue = async (
  data: VenueFormValues,
): Promise<VenueRead> => {
  const response = await api.post<VenueRead>(ENDPOINTS.VENUE.CREATE, data);
  return response.data;
};

export const getVenues = async (
  page: number,
  perPage: number,
  search: string,
): Promise<Venues> => {
  const response = await api.get<Venues>(ENDPOINTS.VENUE.CREATE, {
    params: {
      page: page,
      per_page: perPage,
      search: search,
    },
  });
  return response.data;
};
