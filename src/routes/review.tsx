import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Booking = {
  id: string;
  checkIn: string;
  checkOut: string;
  room: {
    type: string;
    hotel: {
      name: string;
    };
  };
};

export default function Review() {
  useEffect(() => {
    getBooking();
  }, []);

  async function getBooking() {
    await fetch('https://api-tma-2024-production.up.railway.app/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(data);

      const bookings: Booking[] = data.bookings;

      const booking = bookings.filter(bar => bar.id === bookingId)[0];

      setBooking(booking);
    });
  }

  const token = localStorage.getItem('token');

  const {bookingId} = useParams();

  const [booking, setBooking] = useState<Booking | null>();

  if (!booking) return (<><p>Loading...</p></>);

  return (
    <>
      <h1>Review</h1>
      <h2>Booking Details</h2>
      <table>
        <thead>
          <tr>
            <th>Hotel</th>
            <th>Room</th>
            <th>Check-in</th>
            <th>Check-out</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{booking.room.hotel.name}</td>
            <td>{booking.room.type}</td>
            <td>{booking.checkIn.split('T')[0]}</td>
            <td>{booking.checkOut.split('T')[0]}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
