export const ENDPOINTS = {
  EVENT: {
    LIST: "/v1/events/",
    CREATE: "/v1/events/",
    HOLD_SEAT: (event_id: number) => `/v1/events/${event_id}/seats/hold`,
    SEATS: (event_id: number, event_date: string) =>
      `/v1/events/${event_id}/seats?event_date=${event_date}`,
    DETAIL: (event_id: string) => `/v1/events/${event_id}`,
    BOOKING_DETAIL: (booking_id: string) => `/v1/events/booking/${booking_id}`,
    BOOKING_CHECKOUT: (booking_id: number) =>
      `/v1/events/booking/${booking_id}/checkout`,
    DELETE: (event_id: number) => `/v1/events/${event_id}`,
    UPDATE: (event_id: number) => `/v1/events/${event_id}`,
  },
  LLM: {
    CHAT: "/v1/llm/chat",
  },
  USERS: {
    ME: "/v1/users/me",
    LOGIN: "/v1/users/login",
    SIGNOUT: "/v1/users/signout",
    REGISTER: "/v1/users/register",
  },
  VENUE: {
    LIST: "/v1/venues/",
    CREATE: "/v1/venues/",
    DELETE: (venue_id: number) => `/v1/venues/${venue_id}`,
    UPDATE: (venue_id: number) => `/v1/venues/${venue_id}`,
  },
};
