import { Calendar, Globe, Mail, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../button/button';
import styles from './user-details.module.css';

type UserDetailsProps = {
  name: string;
  email: string;
  country: string;
  birthDate: string;
};

export function UserDetails(props: UserDetailsProps) {
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem('token');
    navigate('/auth');
  }

  return (
    <div className={styles['user-details']}>
      <ul className={styles['details-list']}>
        <li><UserRound />Name: {props.name}</li>
        <li><Mail />Email: {props.email}</li>
        <li><Globe />Country: {props.country}</li>
        <li><Calendar />Birth date: {props.birthDate.split('T')[0]}</li>
      </ul>
      <Button text={'Sign out'} onClick={handleSignOut} />
    </div>
  );
}
