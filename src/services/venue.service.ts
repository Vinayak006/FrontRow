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
  owned: boolean,
): Promise<Venues> => {
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page.toString());
  if (perPage) queryParams.append("per_page", perPage.toString());
  if (search) queryParams.append("search", search);
  queryParams.append("owned_venues", owned.toString());
  const response = await api.get<Venues>(ENDPOINTS.VENUE.CREATE, {
    params: queryParams,
  });
  return response.data;
};
