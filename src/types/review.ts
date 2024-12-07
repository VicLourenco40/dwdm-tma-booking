import type { Booking } from './booking';

export type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  bookingId: string;
  booking: Booking;
};
