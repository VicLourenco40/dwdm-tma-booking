import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Loading } from '../../components/loading/loading';
import { Message } from '../../components/message/message';
import { BookingDetails } from '../../components/booking-details/booking-details';
import styles from './booking.module.css';

type Room = {
  id: string;
  type: string;
  price: number;
  images: [{
    url: string;
  }];
};

type Hotel = {
  id: string;
  name: string;
  cancellationPolicy: {
    name: string;
  };
  rooms: Room[];
};

type BookingRequest = {
  roomId: string;
  startDate: string;
  endDate: string;
};

export function Booking() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const {hotelId} = useParams();
  const [hotel, setHotel] = useState<Hotel>();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<BookingRequest>({roomId: '', startDate: '', endDate: ''});
  const [selectedRoom, setSelectedRoom] = useState<Room>();
  const [message, setMessage] = useState({message: '', success: true});

  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = getNextDay(today);
  const [minEndDate, setMinEndDate] = useState(getNextDay(tomorrow));

  async function getHotel() {
    await fetch(`https://api-tma-2024-production.up.railway.app/hotels/${hotelId}`)
      .then(async response => ({
        response,
        data: await response.json()
      }))
      .then(({response, data}) => {
        console.log(response, data);
        if (response.ok) {
          setHotel(data.hotel);
          setBooking({...booking, roomId: data.hotel.rooms[0].id});
          setSelectedRoom(data.hotel.rooms[0]);
        }
      });
  }

  useEffect(() => {
    if (!token) navigate('/auth');

    Promise.all([
      getHotel()
    ])
    .then(() => setLoading(false));
  }, []);

  async function handleAddBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch('https://api-tma-2024-production.up.railway.app/booking', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(booking)
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(response, data);
      if (response.ok) navigate('/user');
      setMessage({message: data.message, success: response.ok});
    });
  }

  function getNextDay(day: string) {
    let nextDay = new Date(day);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().slice(0, 10);
  }

  if (loading) return (<Loading />);

  if (!hotel) return (<Message message={'Could not retrieve hotel'} success={false} />);

  return (
    <>
      <h1>{hotel.name}</h1>
      <div className={styles['booking-container']}>
        <div className={styles['booking-left']}>
          <h2>Booking</h2>
          <form className={styles.form} onSubmit={handleAddBooking}>
            <label htmlFor={'room'}>Room</label>
            <select name={'room'} id={'room'} required
              onChange={event => {
                setBooking({...booking, roomId: event.target.value});
                setSelectedRoom(hotel.rooms.find(room => room.id === event.target.value));
              }}
            >
              {hotel.rooms.map(room => (
                <option key={room.id} value={room.id}>{room.type}</option>
              ))}
            </select>

            <label htmlFor={'start-date'}>Check in</label>
            <input type={'date'} name={'start-date'} id={'start-date'} required min={tomorrow}
              onChange={event => {
                setBooking({...booking, startDate: event.target.value});
                setMinEndDate(getNextDay(event.target.value));
              }}
            />

            <label htmlFor={'end-date'}>Check out</label>
            <input type={'date'} name={'end-date'} id={'end-date'} required min={minEndDate}
              onChange={event => setBooking({...booking, endDate: event.target.value})}/>

            <div className={styles.spacer} />

            <input className={styles['form-submit']} type={'submit'} value={'Confirm'}/>
          </form>
        </div>
        <div className={styles['booking-right']}>
          <BookingDetails
            cancellationPolicy={hotel.cancellationPolicy.name}
            price={selectedRoom!.price}
            {...selectedRoom!.images.length > 0 && {
              image: selectedRoom!.images[0].url
            }}
          />
        </div>
      </div>
      {!!message.message && (
        <div className={styles['message-container']}>
          <Message message={message.message} success={message.success} />
        </div>
      )}
    </>
  );
}
