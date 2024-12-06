import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CalendarOff } from 'lucide-react';

import { Button } from '../button/button';
import { Rating } from '../rating/rating';
import styles from './user-booking.module.css';

type Review = {
  id: string;
  createdAt: string;
  rating: number;
  comment: string;
};

type UserBookingProps = {
  bookingId: string;
  hotel: string;
  room: string;
  checkIn: string;
  checkOut: string;
  review?: Review;
};

export function UserBooking(props: UserBookingProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [hasReview, setHasReview] = useState(!!props.review);

  async function handleDeleteReview() {
    await fetch(`https://api-tma-2024-production.up.railway.app/review/${props.review!.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response);
      if (response.ok) setHasReview(false);
    });
  }

  return (
    <div className={styles['user-booking']}>
      <div className={styles.booking}>
        <div className={styles.dates}>
          <div className={styles.date}>
            <Calendar />
            <p>{props.checkIn.split('T')[0]}</p>
          </div>
          <div className={styles.date}>
            <CalendarOff />
            <p>{props.checkOut.split('T')[0]}</p>
          </div>
        </div>
        <div className={styles.details}>
          <h3>{props.hotel}</h3>
          <p>{props.room}</p>
        </div>
        <div className={styles['buttons-container']}>
          {hasReview ? (
            <>
              <Button text={'Edit review'}
                onClick={() => navigate(`/review/${props.bookingId}`)} />
              <Button text={'Delete review'}
                onClick={handleDeleteReview} />
            </>
          ) : (
            <Button text={'Add review'}
              onClick={() => navigate(`/review/${props.bookingId}`)} />
          )}
        </div>
      </div>
      {hasReview && (
        <div className={styles.review}>
          <p>{props.review!.comment}</p>
          <div className={styles['review-right']}>
            <p>{props.review!.createdAt.split('T')[0]}</p>
            <Rating rating={props.review!.rating} />
          </div>
        </div>
      )}
    </div>
  );
}
