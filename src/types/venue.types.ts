import type { UserResponse } from "./user.types";

export const VenueStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type VenueStatus = (typeof VenueStatus)[keyof typeof VenueStatus];

export interface VenueRead {
  id: number;
  name: string;
  description: string | null;
  rows: number;
  columns: number;
  capacity: number;
  owner: UserResponse;
  contact_email: string;
  contact_mobile: string;
  status: VenueStatus;
}

export type Venues = VenueRead[];
