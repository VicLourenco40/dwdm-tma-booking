import type { Hotel } from './hotel';

export type Room = {
  id: string;
  type: string;
  price: number;
  images: [{
    id: string;
    url: string;
  }];
  hotel: Hotel;
};
