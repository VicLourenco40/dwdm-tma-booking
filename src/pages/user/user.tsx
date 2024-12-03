import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loading } from '../../components/loading/loading';
import { Message } from '../../components/message/message';
import { Button } from '../../components/button/button';
import { UserDetails } from '../../components/user-details/user-details';
import styles from './user.module.css';

type User = {
  id: string;
  name: string;
  email: string;
  country: {
    name: string;
  };
  birthDate: string;
};

type ChangeEmail = {
  email: string;
  password: string;
};

type Review = {
  id: string;
  bookingId: string;
  rating: number;
  comment: string;
};

type Booking = {
  id: string;
  checkIn: string;
  checkOut: string;
  room: {
    type: string;
    hotel: {
      id: string;
      name: string;
    };
  };
  reviews: Review[];
};

export function User() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [changeEmail, setChangeEmail] = useState<ChangeEmail>({email: '', password: ''});
  const [message, setMessage] = useState({message: '', success: true});

  async function getUser() {
    await fetch('https://api-tma-2024-production.up.railway.app/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(response, data)
      setUser(data.user);
    })
  }

  useEffect(() => {
    if (!token) navigate('/auth');

    Promise.all([
      getUser()
    ])
    .then(() => setLoading(false));
  }, []);

  async function handleChangeEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch('https://api-tma-2024-production.up.railway.app/me/change-email', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changeEmail)
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(response, data);
      setMessage({message: data.message, success: response.ok});
      if (response.ok) setUser({...user!, email: changeEmail.email});
    })
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    navigate('/auth');
  }

  if (loading) return (<Loading />);

  if (!user) return (<Message message={'Could not retrieve user'} success={false} />);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <h2>User</h2>
          <div className={styles.details}>
            <UserDetails
              name={user.name}
              email={user.email}
              country={user.country.name}
              birthDate={user.birthDate}
            />
            <Button text={'Sign out'} onClick={handleSignOut} />
          </div>
        </div>
        <div className={styles.section}>
          <h2>Settings</h2>
          <form className={styles.form} onSubmit={handleChangeEmail}>
            <h3>Change email</h3>
            <label htmlFor={'email'}>New Email</label>
            <input type={'email'} name={'email'} id={'email'} required
              placeholder={'Enter your new email address'}
              onChange={event => setChangeEmail({...changeEmail, email: event.target.value})} />

            <label htmlFor={'password'}>Password</label>
            <input type={'password'} name={'password'} id={'password'} required minLength={6}
              placeholder={'Enter your password'}
              onChange={event => setChangeEmail({...changeEmail, password: event.target.value})} />

            <input className={styles['form-submit']} type={'submit'} value={'Update'} />
          </form>
          {message.message && <Message message={message.message} success={message.success} />}
        </div>
      </div>
    </>
  );
}
