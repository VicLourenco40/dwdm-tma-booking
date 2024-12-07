import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { Booking } from '../../types/booking';
import { Loading } from '../../components/loading/loading';
import { Message } from '../../components/message/message';
import { BookingDetails } from '../../components/booking-details/booking-details';
import styles from './review.module.css';
import { Rating } from '../../components/rating/rating';

type ReviewRequest = {
  bookingId: string;
  rating: number;
  comment: string;
}

export function Review() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const {bookingId} = useParams();
  const [booking, setBooking] = useState<Booking>();
  const [reviewId, setReviewId] = useState<string>();
  const [review, setReview] = useState<ReviewRequest>({bookingId: bookingId!, rating: 1, comment: ''});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({message: '', success: true});

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
      console.log(response, data);
      const booking: Booking = data.bookings.find((booking: Booking) => booking.id === bookingId);
      setBooking(booking);
      if (booking && booking.reviews.length > 0) {
        setReviewId(booking.reviews[0].id);
        setReview(booking.reviews[0]);
      }
    });
  }

  useEffect(() => {
    if (!token) navigate('/auth');

    Promise.all([
      getBooking()
    ])
    .then(() => setLoading(false));
  }, []);

  async function handlePostReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch('https://api-tma-2024-production.up.railway.app/review', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(response, data);
      if (response.ok) navigate('/user');
      setMessage({message: data.message, success: response.ok});
    })
  }

  async function handleUpdateReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch(`https://api-tma-2024-production.up.railway.app/review/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(response, data);
      if (response.ok) navigate('/user');
      setMessage({message: data.message, success: response.ok});
    })
  }

  if (loading) return (<Loading />);

  if (!booking) return (<Message message={'Could not retrieve booking'} success={false} />);

  return (
    <>
      <div className={styles['review-container']}>
        <div className={styles.section}>
          <h2>Booking Details</h2>
          <BookingDetails
            hotel={booking.room.hotel.name}
            room={booking.room.type}
            checkIn={booking.checkIn}
            checkOut={booking.checkOut}
          />
        </div>
        <div className={styles.section}>
          <h2>Review</h2>
          <form className={styles.form}
            onSubmit={reviewId ? handleUpdateReview : handlePostReview}>
            <label htmlFor={'rating'}>Rating</label>
            <div className={styles['form-rating']}>
              <input type={'number'} name={'rating'} id={'rating'} required min={1} max={5}
                value={review.rating}
                onChange={event => setReview({...review, rating: Number(event.target.value)})} />
              <Rating rating={review.rating} />
            </div>

            <label htmlFor={'comment'}>Comment</label>
            <textarea name={'comment'} id={'comment'} required minLength={10} rows={4}
              value={review.comment}
              onChange={event => setReview({...review, comment: event.target.value})} />

            <input className={styles['form-submit']} type={'submit'}
              value={reviewId ? 'Edit Review' : 'Add Review'} />
          </form>
        </div>
      </div>
      {!!message.message && (
        <div className={styles['message-container']}>
          <Message message={message.message} success={message.success} />
        </div>
      )}
    </>
  );
}
