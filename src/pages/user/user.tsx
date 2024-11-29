import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './user.module.css';

type User = {
  id: string;
  name: string;
  email: string;
  country: {
    name: string;
  }
  birthDate: string;
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

type Review = {
  id: string;
  bookingId: string;
  rating: number;
  comment: string;
};

export function User() {
  useEffect(() => {
    if (token) {
      getUser();
    } else {
      navigate('/sign-in');
    }
  }, []);

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
      console.log(data);

      if (response.status === 200) {
        setUser(data.user);
        setBookings(data.bookings);
      } else {
        localStorage.removeItem('token');
        navigate('/sign-in');
      }
    });
  }

  async function handleChangeEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch('https://api-tma-2024-production.up.railway.app/me/change-email', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(data);

      if (response.status === 200 && user) {
        setUser({...user, email: email});
      }

      setMessage(data.message);
    })
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    navigate('/sign-in');
  }

  async function handleDeleteReview(id: string) {
    await fetch(`https://api-tma-2024-production.up.railway.app/review/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(data);

      if (response.status === 201) {
        getUser();
      }
    });
  }

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [user, setUser] = useState<User | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

  if (!user) return (<p>Loading...</p>);

  return (
    <>
      <h1>{user.name}</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Country</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.email}</td>
            <td>{user.country.name}</td>
            <td>{user.birthDate.split('T')[0]}</td>
          </tr>
        </tbody>
      </table>
      <h2>Settings</h2>
      <h3>Change email</h3>
      <form onSubmit={handleChangeEmail}>
        <label htmlFor='email'>New email</label>
        <input
          type='email'
          name='email'
          id='email'
          required
          onChange={event => setEmail(event.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          minLength={6}
          required
          onChange={event => setPassword(event.target.value)}
        />
        <input type='submit' value='Change' />
      </form>
      {message && <p>{message}</p>}
      <button onClick={handleSignOut}>Sign Out</button>
      <h2>Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Hotel</th>
            <th>Room</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td><Link to={`/hotels/${booking.room.hotel.id}`}>{booking.room.hotel.name}</Link></td>
              <td>{booking.room.type}</td>
              <td>{booking.checkIn.split('T')[0]}</td>
              <td>{booking.checkOut.split('T')[0]}</td>
              <td>
                <button onClick={() => navigate(`/review/${booking.id}`)}>
                  {booking.reviews[0] ? 'Update Review' : 'Create review'}
                </button>
                {booking.reviews[0] && (
                  <button onClick={() => handleDeleteReview(booking.reviews[0].id)}>
                    Delete review
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
