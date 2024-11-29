import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './review.module.css';

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
  reviews: Review[];
};

type Review = {
  id?: string;
  bookingId?: string;
  rating: number;
  comment: string;
};

export default function Review() {
  useEffect(() => {
    if (token) {
      getBooking();
    } else {
      navigate('/sign-in');
    }
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
      const booking = bookings.filter(booking => booking.id === bookingId)[0];

      if (booking) {
        setBooking(booking);

        const review = booking.reviews[0];

        if (review) setReview(review);
      } else {
        navigate('/user');
      }
    });
  }

  async function handlePostReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch('https://api-tma-2024-production.up.railway.app/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(review)
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(data);

      if (response.status === 201) {
        setReview({...review, id: data.review.id});
      }

      setMessage(data.message);
    });
  }

  async function handleUpdateReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch(`https://api-tma-2024-production.up.railway.app/review/${review.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        rating: review.rating,
        comment: review.comment
      })
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(data);

      setMessage(data.message);
    });
  }

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const {bookingId} = useParams();

  const [booking, setBooking] = useState<Booking | null>();

  const [review, setReview] = useState<Review>({
    bookingId: bookingId,
    rating: 1,
    comment: ''
  });

  const [message, setMessage] = useState('');

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
      <h2>Review</h2>
      <form onSubmit={review.id ? handleUpdateReview : handlePostReview}>
        <label htmlFor='rating'>Rating</label>
        <input
          type='number'
          name='rating'
          id='rating'
          min={1}
          max={5}
          required
          onChange={event => {
            setReview({...review, rating: Number(event.target.value)});
          }}
        />
        <label htmlFor='comment'>Comment</label>
        <textarea
          name='comment'
          id='comment'
          rows={5}
          cols={50}
          minLength={10}
          required
          onChange={event => {
            setReview({...review, comment: event.target.value});
          }}
        />
        <input type='submit' value={review.id ? 'Update review' : 'Post review'} />
      </form>
      {message && <p>{message}</p>}
    </>
  );
}
