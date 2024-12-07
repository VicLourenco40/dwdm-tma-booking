import { Wallet, BookX } from 'lucide-react';

import styles from './room-details.module.css';

type RoomDetailsProps = {
  cancellationPolicy: string;
  price: number;
  image?: string;
};

export function RoomDetails(props: RoomDetailsProps) {
  return (
    <div className={styles['room-details']}>
      <div className={styles['image-container']}>
        {!!props.image && (
          <img src={props.image} />
        )}
      </div>
      <ul className={styles['details-list']}>
        <li><Wallet />Price: {props.price}€ per night</li>
        <li><BookX />Cancellation policy: {props.cancellationPolicy}</li>
      </ul>
    </div>
  );
}
