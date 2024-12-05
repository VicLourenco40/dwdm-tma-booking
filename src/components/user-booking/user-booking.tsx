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
  handleDeleteReview?: (reviewId: string) => void;
};

export function UserBooking(props: UserBookingProps) {
  const navigate = useNavigate();

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
          {props.review ? (
            <>
              <Button text={'Edit Review'}
                onClick={() => navigate(`/review/${props.bookingId}`)} />
              <Button text={'Delete Review'}
                onClick={() => props.handleDeleteReview!(props.review!.id)} />
            </>
          ) : (
            <Button text={'Add Review'}
              onClick={() => navigate(`/review/${props.bookingId}`)} />
          )}
        </div>
      </div>
      {props.review && (
        <div className={styles.review}>
          <p>{props.review.comment}</p>
          <div className={styles['review-right']}>
            <p>{props.review.createdAt.split('T')[0]}</p>
            <Rating rating={props.review.rating} />
          </div>
        </div>
      )}
    </div>
  );
}
