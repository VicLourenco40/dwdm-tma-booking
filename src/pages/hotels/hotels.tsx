import { useEffect, useState } from 'react';

import { Loading } from '../../components/loading/loading';
import { HotelCard } from '../../components/hotel-card/hotel-card';
import styles from './hotels.module.css';

type Hotel = {
  id: string;
  name: string;
  location: string;
  country: {
    name: string;
  };
  averageReview: number;
};

export function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  async function getHotels() {
    await fetch('https://api-tma-2024-production.up.railway.app/hotels')
      .then(async response => ({
        response,
        data: await response.json()
      }))
      .then(({response, data}) => {
        console.log(response, data);
        setHotels(data.hotels);
      });
  }

  useEffect(() => {
    Promise.all([
      getHotels()
    ]).then(() => setLoading(false));

  }, []);

  if (loading) return (<Loading />);

  return (
    <>
      <h1>Hotels</h1>
      <div className={styles['hotels-container']}>
        {hotels.map(hotel => (
          <HotelCard
            key={hotel.id}
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
