import { api } from "./api";
import { ENDPOINTS } from "@/const/endpoints";
import type { EventInput, EventRead, Events } from "@/types/event.types";

export const createEvent = async (data: EventInput): Promise<EventRead> => {
  const { data: event } = await api.post<EventRead>(
    ENDPOINTS.EVENT.CREATE,
    data,
  );

  return event;
};

export const getEvents = async (
  page: number,
  perPage: number,
  search: string,
  owned: boolean,
  from_date?: string,
): Promise<Events> => {
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page.toString());
  if (perPage) queryParams.append("per_page", perPage.toString());
  if (search) queryParams.append("search", search);
  queryParams.append("owned", owned.toString());
  if (from_date) queryParams.append("from_date", from_date);

  const response = await api.get<Events>(ENDPOINTS.EVENT.LIST, {
    params: queryParams,
  });
  return response.data;
};
