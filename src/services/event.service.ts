import { api } from "./api";
import { ENDPOINTS } from "@/const/endpoints";
import type {
  EventBookingRead,
  EventInput,
  EventRead,
  Events,
  EventSeatHoldRequest,
  EventBookingIDResponse,
  EventSeats,
} from "@/types/event.types";

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

export const getEvent = async (id: string): Promise<EventRead> => {
  const response = await api.get<EventRead>(ENDPOINTS.EVENT.DETAIL(id));
  return response.data;
};

export const getEventSeats = async (
  id: number,
  date: string,
): Promise<EventSeats> => {
  const response = await api.get<EventSeats>(ENDPOINTS.EVENT.SEATS(id, date));
  return response.data;
};

export const holdEventSeats = async (
  data: EventSeatHoldRequest,
): Promise<EventBookingIDResponse> => {
  const response = await api.post<EventBookingIDResponse>(
    ENDPOINTS.EVENT.HOLD_SEAT(data.event_id),
    data,
  );
  return response.data;
};

export const checkoutEventBooking = async (
  booking_id: number,
): Promise<EventBookingIDResponse> => {
  const response = await api.post<EventBookingIDResponse>(
    ENDPOINTS.EVENT.BOOKING_CHECKOUT(booking_id),
  );
  return response.data;
};

export const getEventBookingDetail = async (
  booking_id: string,
): Promise<EventBookingRead> => {
  const response = await api.get<EventBookingRead>(
    ENDPOINTS.EVENT.BOOKING_DETAIL(booking_id),
  );
  return response.data;
};
