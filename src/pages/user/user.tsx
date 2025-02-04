import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { User } from '../../types/user';
import type { Booking } from '../../types/booking';
import { Loading } from '../../components/loading/loading';
import { Message } from '../../components/message/message';
import { Form } from '../../components/form/form';
import { UserDetails } from '../../components/user-details/user-details';
import { UserBooking } from '../../components/user-booking/user-booking';
import styles from './user.module.css';

type ChangeEmailRequest = {
  email: string;
  password: string;
};

export function User() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [user, setUser] = useState<User>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [changeEmail, setChangeEmail] = useState<ChangeEmailRequest>({email: '', password: ''});
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
      setBookings(data.bookings);
    });
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
      if (response.ok) setUser({...user!, email: changeEmail.email});
      setMessage({message: data.message, success: response.ok});
    });
  }

  if (loading) return (<Loading />);

  if (!user) return (<Message message={'Could not retrieve user'} success={false} />);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <h2>User</h2>
          <UserDetails
            name={user.name}
            email={user.email}
            country={user.country.name}
            birthDate={user.birthDate}
          />
        </div>
        <div className={styles.section}>
          <h2>Settings</h2>
          <Form onSubmit={handleChangeEmail}>
            <h3>Change email</h3>
            <label htmlFor={'email'}>New Email</label>
            <input type={'email'} name={'email'} id={'email'} required
              placeholder={'Enter your new email address'}
              onChange={event => setChangeEmail({...changeEmail, email: event.target.value})} />

            <label htmlFor={'password'}>Password</label>
            <input type={'password'} name={'password'} id={'password'} required minLength={6}
              placeholder={'Enter your password'}
              onChange={event => setChangeEmail({...changeEmail, password: event.target.value})} />

            <input type={'submit'} value={'Update'} />
          </Form>
        </div>
      </div>
      {!!message.message && (
        <div className={styles['message-container']}>
          <Message message={message.message} success={message.success} />
        </div>
      )}
      {bookings.length > 0 && (
        <div className={styles.section}>
          <h2>Bookings</h2>
          <div className={styles['bookings-container']}>
            {bookings.map(booking => (
              <UserBooking
                key={booking.id}
                bookingId={booking.id}
                hotel={booking.room.hotel.name}
                room={booking.room.type}
                checkIn={booking.checkIn}
                checkOut={booking.checkOut}
                {...booking.reviews.length > 0 && {
                  review: booking.reviews[0]
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
