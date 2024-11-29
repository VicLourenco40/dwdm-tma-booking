import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loading } from '../../components/loading/loading';
import { HotelDetails } from '../../components/hotel-details/hotel-details';
import { HotelAmenity } from '../../components/hotel-amenity/hotel-amenity';
import { HotelReview } from '../../components/hotel-review/hotel-review';
import styles from './hotel.module.css';

type Hotel = {
  id: string;
  name: string;
  description: string;
  location: string;
  country: {
    name: string;
  };
  rooms: [{
    images: [{
      id: string;
      url: string;
    }];
  }];
  amenities: [{
    id: string;
    name: string;
  }];
  reviews: [{
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    booking: {
      user: {
        name: string;
        country: {
          name: string;
        };
      };
    };
  }];
  averageRating: number;
};

export default function Hotel() {
  useEffect(() => {
    getHotel();
  }, []);

  const { hotelId } = useParams();

  async function getHotel() {
    await fetch(`https://api-tma-2024-production.up.railway.app/hotels/${hotelId}`)
      .then(async response => await response.json())
      .then(data => setHotel(data.hotel));
  }

  const [hotel, setHotel] = useState<Hotel | null>(null);

  if (!hotel) return (<Loading />);

  return (
    <>
      <h1>{hotel.name}</h1>
      <HotelDetails
        id={hotel.id}
        location={hotel.location}
        country={hotel.country.name}
        rating={hotel.averageRating}
        description={hotel.description}
        image={hotel.rooms[0].images[0].url}
      />

      <h2>Amenities</h2>
      <div className={styles['amenities-container']}>
        {hotel.amenities.map(amenity => (
          <HotelAmenity
            key={amenity.id}
            id={amenity.id}
            name={amenity.name}
          />
        ))}
      </div>

      {!!hotel.reviews.length && (
        <>
          <h2>Reviews</h2>
          <div className={styles['reviews-container']}>
            {hotel.reviews.map(review => (
              <HotelReview
                key={review.id}
                name={review.booking.user.name}
                country={review.booking.user.country.name}
                createdAt={review.createdAt}
                rating={review.rating}
                comment={review.comment}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
