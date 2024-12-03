import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button/button';
import styles from './home.module.css';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Booking</h1>
      <div className={styles['buttons-container']}>
        <Button text={'Browse hotels'} onClick={() => navigate('/hotels')} />
        <Button text={'User profile'} onClick={() => navigate('/user')} />
      </div>
    </div>
  );
}
