import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);

  return (
    <>
      <h1>Hotels</h1>
      <div className={'hotels-container'}>
        {hotels.map(hotel => (
          <div className={'hotel'} onClick={() => navigate(`/hotels/${hotel.id}`)}>
            <div className={'hotel-left'}>
              <h2>{hotel.name}</h2>
              <p>{hotel.location}, {hotel.country.name}</p>
            </div>
            <p className={'hotel-rating'}>
              {hotel.averageReview} / 5 <span className='gold'>★</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
