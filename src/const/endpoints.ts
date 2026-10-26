export const ENDPOINTS = {
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
  EVENT: {
    LIST: "/v1/events/",
    CREATE: "/v1/events/",
    DELETE: (event_id: number) => `/v1/events/${event_id}`,
    UPDATE: (event_id: number) => `/v1/events/${event_id}`,
  },
};
