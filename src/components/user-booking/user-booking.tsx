import { useNavigate } from 'react-router-dom';
import { Calendar, CalendarOff } from 'lucide-react';

import { Button } from '../button/button';
import styles from './user-booking.module.css';

type UserBookingProps = {
  bookingId: string;
  hotel: string;
  room: string;
  checkIn: string;
  checkOut: string;
  reviewId: string | null;
  handleDeleteReview: (reviewId: string) => void;
};

export function UserBooking(props: UserBookingProps) {
  const navigate = useNavigate();
  const hasReview = !!props.reviewId;

  return (
    <div className={styles['user-booking']}>
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
            <Button text={'Edit Review'}
              onClick={() => navigate(`/review/${props.bookingId}`)} />
            <Button text={'Delete Review'}
              onClick={() => props.handleDeleteReview(props.reviewId!)} />
          </>
        ) : (
          <Button text={'Add Review'}
            onClick={() => navigate(`/review/${props.bookingId}`)} />
        )}
      </div>
    </div>
  );
}
