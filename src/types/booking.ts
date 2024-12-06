import type { Room } from './room';
import type { User } from './user';
import type { Review } from './review';

export type Booking = {
  id: string;
  checkIn: string;
  checkOut: string;
  room: Room;
  user: User;
  reviews: Review[];
};
