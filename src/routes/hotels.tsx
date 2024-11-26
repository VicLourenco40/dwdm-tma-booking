import { useEffect, useState } from 'react';

import { HotelCard } from '../components/hotel-card/hotel-card';
import './hotels.css';

type Hotel = {
  id: string;
  name: string;
  location: string;
  country: {
    name: string;
  };
  averageReview: number;
};

export default function Hotels() {
  useEffect(() => {
    getHotels();
  }, []);

  async function getHotels() {
    await fetch('https://api-tma-2024-production.up.railway.app/hotels')
      .then(async response => await response.json())
      .then(data => setHotels(data.hotels));
  }

  const [hotels, setHotels] = useState<Hotel[]>([]);

  return (
    <>
      <h1>Hotels</h1>
      <div className={'hotels-container'}>
        {hotels.map(hotel => (
          <HotelCard
            id={hotel.id}
            name={hotel.name}
            location={hotel.location}
            country={hotel.country.name}
            rating={hotel.averageReview}
          />
        ))}
      </div>
    </>
  );
}
