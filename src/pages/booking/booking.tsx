import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './booking.module.css';

type Hotel = {
  id: string;
  name: string;
  cancellationPolicy: {
    name: string;
  };
  rooms: [{
    id: string;
    type: string;
    price: number;
    images: [{
      id: string;
      url: string;
    }];
  }];
}

type Booking = {
  roomId: string;
  startDate: string;
  endDate: string;
}

export function Booking() {
  useEffect(() => {
    if (token) {
      getHotel();
    } else {
      navigate('/auth');
    }
  }, []);

  async function getHotel() {
    await fetch(`https://api-tma-2024-production.up.railway.app/hotels/${hotelId}`)
      .then(response => response.json())
      .then(data => setHotel(data.hotel));
  }

  async function handleBookRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch('https://api-tma-2024-production.up.railway.app/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(booking)
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(data);

      setMessage(data.message);
    })
  }

  function getNextDay(day: string) {
    let nextDay = new Date(day);

    nextDay.setDate(nextDay.getDate() + 1);

    return nextDay.toISOString().slice(0, 10);
  }

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = getNextDay(today);

  const { hotelId } = useParams();

  const [ hotel, setHotel ] = useState<Hotel | null>(null);

  const [ booking, setBooking ] = useState<Booking>({
    roomId: '',
    startDate: '',
    endDate: ''
  });

  const [ message, setMessage ] = useState('');

  const [ minEndDate, setMinEndDate ] = useState(getNextDay(tomorrow));

  if (!hotel) return (
    <>
      <p>Loading...</p>
    </>
  );

  return (
    <>
      <h1>{hotel.name}</h1>
      <h2>Booking</h2>
      <p>{hotel.cancellationPolicy.name}</p>
      <form onSubmit={handleBookRoom}>
        <label htmlFor='room'>Room</label>
        <select
          name='room'
          id='room'
          required
          onChange={event => {
            setBooking({...booking, roomId: event.target.value});
          }}
        >
          <option value=''>Select</option>
          {hotel.rooms.map(room => (
            <option key={room.id} value={room.id}>{room.type}</option>
          ))}
        </select>
        <label htmlFor='start-date'>Start date</label>
        <input
          type='date'
          name='start-date'
          id='start-date'
          min={tomorrow}
          required
          onChange={event => {
            setBooking({...booking, startDate: event.target.value});
            setMinEndDate(getNextDay(event.target.value));
          }}
        />
        <label htmlFor='start-date'>End date</label>
        <input
          type='date'
          name='end-date'
          id='end-date'
          min={minEndDate}
          required
          onChange={event => {
            setBooking({...booking, endDate: event.target.value})
          }}
        />
        <input type='submit' value='Book room' />
      </form>
      {message && <p>{message}</p>}
    </>
  );
}
