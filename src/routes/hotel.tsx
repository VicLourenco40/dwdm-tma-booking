import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Hotel = {
  id: string;
  name: string;
};

export default function Hotel() {
  useEffect(() => {
    getHotel();
  }, []);

  const { hotelId } = useParams();

  async function getHotel() {
    await fetch(`https://api-tma-2024-production.up.railway.app/hotels/${hotelId}`)
      .then(async response => await response.json())
      .then(data => setHotel(data.hotel))
  }

  const [hotel, setHotel] = useState<Hotel | null>(null);

  return (
    <>
      {hotel ? (
        <h1>{hotel.name}</h1>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
