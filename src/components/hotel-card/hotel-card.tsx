import { useNavigate } from 'react-router-dom';

import styles from './hotel-card.module.css';

type HotelCardProps = {
  id: string;
  name: string;
  location: string;
  country: string;
  rating: number;
};

export function HotelCard(props: HotelCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.container}
      onClick={() => navigate(`/hotels/${props.id}`)}
    >
      <div className={styles.left}>
        <h2>{props.name}</h2>
        <p>{props.location}, {props.country}</p>
      </div>
      <p className={styles.rating}>
        {props.rating} / 5 <span className={styles.gold}>★</span>
      </p>
    </div>
  );
}
