import { Rating } from '../rating/rating';
import styles from './hotel-review.module.css';

type HotelReviewProps = {
  name: string;
  country: string;
  createdAt: string;
  rating: number;
  comment: string;
}

export function HotelReview(props: HotelReviewProps) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.left}>
          <h3>{props.name}</h3>
          <p>{props.country}</p>
        </div>
        <div className={styles.right}>
          <p>{props.createdAt.split('T')[0]}</p>
          <Rating rating={props.rating} />
        </div>
      </div>
      <p>{props.comment}</p>
    </div>
  );
}
