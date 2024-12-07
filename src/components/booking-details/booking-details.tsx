import { BedDouble, Calendar, CalendarOff, Hotel } from 'lucide-react';

import styles from './booking-details.module.css';

type BookingDetailsProps = {
  hotel: string;
  room: string;
  checkIn: string;
  checkOut: string;
}

export function BookingDetails(props: BookingDetailsProps) {
  return (
    <div className={styles['booking-details']}>
      <ul className={styles['details-list']}>
        <li><Hotel />Hotel: {props.hotel}</li>
        <li><BedDouble />Room: {props.room}</li>
        <li><Calendar />Check in: {props.checkIn.split('T')[0]}</li>
        <li><CalendarOff />Check out: {props.checkOut.split('T')[0]}</li>
      </ul>
    </div>
  );
}
