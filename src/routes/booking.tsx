import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Hotel = {
  id: string;
  name: string;
  cancellationPolicy: {
    name: string;
  }
  rooms: [{
    id: string;
    type: string;
    price: number;
    images: [{
      id: string;
      url: string;
    }]
  }]
}

export default function Booking() {
  useEffect(() => {
    getHotel();
  }, []);

  async function getHotel() {
    await fetch(`https://api-tma-2024-production.up.railway.app/hotels/${hotelId}`)
      .then(response => response.json())
      .then(data => setHotel(data.hotel));
  }

  async function handleBookRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const { hotelId } = useParams();

  const [ hotel, setHotel ] = useState<Hotel | null>(null);

  if (!hotel) return (<></>);

  return (
    <>
      <h1>{hotel.name}</h1>
      <h2>Booking</h2>
      <p>{hotel.cancellationPolicy.name}</p>
      <form onSubmit={handleBookRoom}>
        <label htmlFor='room'>Room</label>
        <select name='room' id='room'>
          <option value=''>Select</option>
          {hotel.rooms.map(room => (
            <option value={room.id}>{room.type}</option>
          ))}
        </select>
        <label htmlFor='start-date'>Start date</label>
        <input type='date' name='start-date' id='start-date' />
        <label htmlFor='start-date'>End date</label>
        <input type='date' name='end-date' id='end-date' />
        <input type='submit' value='Book room' />
      </form>
    </>
  );
}
