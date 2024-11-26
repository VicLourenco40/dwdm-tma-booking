import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Loading } from '../components/loading/loading';
import { HotelDetails } from '../components/hotel-details/hotel-details';

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
    }]
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
        }
      }
    }
  }]
  averageRating: number;
};

export default function Hotel() {
  useEffect(() => {
    getHotel();
  }, []);

  const { hotelId } = useParams();

  const navigate = useNavigate();

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
    </>
  );

  return (
    <>
      {hotel ? (
        <>
          <h1>{hotel.name}</h1>
          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Country</th>
                <th>Rooms</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{hotel.location}</td>
                <td>{hotel.country.name}</td>
                <td>{hotel.rooms.length}</td>
                <td>{hotel.averageRating}</td>
              </tr>
            </tbody>
          </table>
          <p>{hotel.description}</p>
          <button onClick={handleBookRoom}>Book room</button>
          <h2>Gallery</h2>
          <div className='gallery'>
            {hotel.rooms.map(room => (
              room.images.map(image => (
                <img key={image.id} src={image.url} />
              )))
            )}
          </div>
          <h2>Amenities</h2>
          <ul>
            {hotel.amenities.map(amenity => (
              <li key={amenity.id}>{amenity.name}</li>
            ))}
          </ul>
          <button onClick={handleBookRoom}>Book room</button>
          <h2>Reviews</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Posted</th>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {hotel.reviews.map(review => (
                <tr key={review.id}>
                  <td>{review.booking.user.name}</td>
                  <td>{review.booking.user.country.name}</td>
                  <td>{review.createdAt.split('T')[0]}</td>
                  <td>{review.rating}</td>
                  <td>{review.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
