import { useNavigate } from 'react-router-dom';

import { Rating } from '../rating/rating';
import { Button } from '../button/button';
import styles from './hotel-details.module.css';

type HotelDetailsProps = {
  id: string;
  location: string;
  country: string;
  rating: number;
  description: string;
  image: string;
}

export function HotelDetails(props: HotelDetailsProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles['details-top']}>
          <p>{props.location}, {props.country}</p>
          <Rating rating={props.rating} />
        </div>
        <p className={styles['details-description']}>
          {props.description}
        </p>
        <Button
          text={'Book Room'}
          onClick={() => navigate(`/booking/${props.id}`)}
        />
      </div>
      <img className={styles.image} src={props.image} />
    </div>
  );
}
