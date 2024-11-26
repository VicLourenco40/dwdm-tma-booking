import { useNavigate } from 'react-router-dom';

import './hotel-card.css';

type HotelCardProps = {
  id: string;
  name: string;
  location: string;
  country: string;
  rating: number;
};

export function HotelCard(props: HotelCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={'container'}
      onClick={() => {navigate(`/hotels/${props.id}`)}}
    >
      <div className={'left'}>
        <h2>{props.name}</h2>
        <p>{props.location}, {props.country}</p>
      </div>
      <p className={'rating'}>
        {props.rating} / 5 <span className='gold'>★</span>
      </p>
    </div>
  );
}
