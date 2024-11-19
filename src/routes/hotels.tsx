import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Hotel = {
  id: string;
  name: string;
  location: string;
  country: {
    name: string;
  }
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Country</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map(hotel => (
            <tr key={hotel.id}>
              <td>
                <Link to={`/hotels/${hotel.id}`}>{hotel.name}</Link>
              </td>
              <td>{hotel.location}</td>
              <td>{hotel.country.name}</td>
              <td>{hotel.averageReview}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
