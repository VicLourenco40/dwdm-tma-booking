import { Calendar, Globe, Mail, UserRound } from 'lucide-react';

import styles from './user-details.module.css';

type UserDetailsProps = {
  name: string;
  email: string;
  country: string;
  birthDate: string;
};

export function UserDetails(props: UserDetailsProps) {
  return (
    <ul className={styles['user-details']}>
      <li><UserRound />Name: {props.name}</li>
      <li><Mail />Email: {props.email}</li>
      <li><Globe />Country: {props.country}</li>
      <li><Calendar />Birth date: {props.birthDate.split('T')[0]}</li>
    </ul>
  );
}
