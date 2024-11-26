import { Rating } from '../rating/rating';
import styles from './hotel-details.module.css';

type HotelDetailsProps = {
  location: string;
  country: string;
  rating: number;
  description: string;
  image: string;
}

export function HotelDetails(props: HotelDetailsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles['details-top']}>
          <p>{props.location}, {props.country}</p>
          <Rating rating={props.rating}/>
        </div>
        <p className={styles.description}>{props.description}</p>
      </div>
      <img className={styles.image} src={props.image} />
    </div>
  );
}
