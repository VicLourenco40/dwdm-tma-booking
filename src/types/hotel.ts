import type { Country } from './country';
import type { Room } from './room';
import type { Review } from './review';

export type Hotel = {
  id: string;
  name: string;
  description: string;
  location: string;
  country: Country;
  rooms: Room[];
  amenities: [{
    id: string;
    name: string;
  }];
  reviews: Review[];
  cancellationPolicy: {
    id: string;
    name: string;
  };
  averageReview: number;
  averageRating: number;
};
