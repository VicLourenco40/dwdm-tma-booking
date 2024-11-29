import { icons } from 'lucide-react';

import { amenities } from '../../data/amenities';
import styles from './hotel-amenity.module.css';

type HotelAmenityProps = {
  id: string;
  name: string;
};

export function HotelAmenity(props: HotelAmenityProps) {
  const amenity = amenities.find(amenity => amenity.id === props.id)!;
  const LucideIcon = icons[amenity.icon];

  return (
    <div className={styles.container}>
      <LucideIcon />
      <p>{props.name}</p>
    </div>
  );
}
