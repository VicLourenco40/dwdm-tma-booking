import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Hotel = {
  id: string;
  name: string;
  description: string;
  location: string;
  country: {
    name: string;
  };
  rooms: [
    {
      id: string;
    }
  ];
  averageRating: number;
};

export default function Hotel() {
  useEffect(() => {
    getHotel();
  }, []);

  const { hotelId } = useParams();

  async function getHotel() {
    await fetch(`https://api-tma-2024-production.up.railway.app/hotels/${hotelId}`)
      .then(async response => await response.json())
      .then(data => setHotel(data.hotel));
  }

  const [hotel, setHotel] = useState<Hotel | null>(null);

  return (
    <>
      {hotel ? (
        <>
          <h1>{hotel.name}</h1>
          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Country</th>
                <th>Rooms</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{hotel.location}</td>
                <td>{hotel.country.name}</td>
                <td>{hotel.rooms.length}</td>
                <td>{hotel.averageRating}</td>
              </tr>
            </tbody>
          </table>
          <p>{hotel.description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
