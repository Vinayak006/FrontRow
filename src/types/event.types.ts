import type { UserResponse } from "./user.types";
import type { VenueRead } from "./venue.types";

export type EventCategory =
  | "entertainment"
  | "education"
  | "comedy-show"
  | "music-concert";

export type EventStatus = "active" | "inactive";

export type EventSeatStatus = "reserved" | "available" | "hold";

export interface EventInput {
  name: string;
  description: string | null;
  base_price: number;

  venue_id: number;
  from_date: string;
  to_date: string;
  from_time: string;
  to_time: string;

  location: string;
  status: string;
  contact_email: string;
  contact_mobile: string;
  category: string;
}

export interface EventRead {
  id: number;
  name: string;
  description: string | null;
  base_price: number;

  venue: VenueRead;
  organizer: UserResponse;

  from_date: string;
  to_date: string;
  from_time: string;
  to_time: string;

  location: string;
  status: EventStatus;
  contact_email: string;
  contact_mobile: string;
  category: EventCategory;

  created_at: string;
  updated_at: string;
}

export interface EventSeatInfo {
  id: number;
  seat_number: string;
  status: EventSeatStatus;
}

export type EventSeats = EventSeatInfo[];

export type Events = EventRead[];

export type EventBookingStatus = "pending" | "confirmed" | "cancelled";

export interface EventSeatHoldRequest {
  event_id: number;
  seat_ids: number[];
  event_date: string;
}

export interface EventBookingIDResponse {
  booking_id: number;
}

export interface EventBookingRead {
  id: number;
  event_date: string;
  status: EventBookingStatus;
  event: EventRead;
  seats: EventSeatInfo[];
}
