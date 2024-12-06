import { Wallet, BookX } from 'lucide-react';

import styles from './booking-details.module.css';

type BookingDetailsProps = {
  cancellationPolicy: string;
  price: number;
  image?: string;
};

export function BookingDetails(props: BookingDetailsProps) {
  return (
    <div className={styles['booking-details']}>
      <div className={styles['image-container']}>
        {!!props.image && (
          <img src={props.image} />
        )}
      </div>
      <ul className={styles['details-list']}>
        <li><Wallet />{props.price}€ per night</li>
        <li><BookX />{props.cancellationPolicy}</li>
      </ul>
    </div>
  );
}
