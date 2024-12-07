import { useEffect, useState } from 'react';

import type { Hotel } from '../../types/hotel';
import type { Country } from '../../types/country';
import { Loading } from '../../components/loading/loading';
import { Message } from '../../components/message/message';
import { HotelCard } from '../../components/hotel-card/hotel-card';
import styles from './hotels.module.css';

export function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>();
  const [countries, setCountries] = useState<Country[]>();
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

  async function getHotels() {
    await fetch('https://api-tma-2024-production.up.railway.app/hotels')
      .then(async response => ({
        response,
        data: await response.json()
      }))
      .then(({response, data}) => {
        console.log(response, data);
        setHotels(data.hotels);
      });
  }

  async function getCountries() {
    await fetch('https://api-tma-2024-production.up.railway.app/countries')
      .then(async response => ({
        response,
        data: await response.json()
      }))
      .then(({response, data}) => {
        console.log(response, data);
        setCountries(data.countries);
      });
  }

  useEffect(() => {
    Promise.all([
      getHotels(),
      getCountries()
    ])
    .then(() => setLoading(false));
  }, []);

  if (loading) return (<Loading />);
  if (!hotels) return (<Message message={'Could not retrieve hotels'} success={false} />);
  if (!countries) return (<Message message={'Could not retrieve countries'} success={false} />);

  const filteredHotels = hotels.filter(hotel => {
    const matchesName = hotel.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesCountry = !countryFilter || hotel.country.id === countryFilter;
    return matchesName && matchesCountry;
  });

  return (
    <>
      <h1>Hotels</h1>
      <div className={styles.container}>
        <div className={styles['filters']}>
          <label htmlFor={'filter-name'}>Name</label>
          <input type={'text'} name={'filter-name'} id={'filter-name'}
            onChange={event => setNameFilter(event.target.value)} />

          <label htmlFor={'filter-country'}>Country</label>
          <select name={'filter-country'} id={'filter-country'}
            onChange={event => setCountryFilter(event.target.value)}>
            <option value={''}>Select</option>
            {countries.map(country => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))}
          </select>
        </div>
        <div className={styles['hotels-list']}>
          {filteredHotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              location={hotel.location}
              country={hotel.country.name}
              rating={hotel.averageReview}
            />
          ))}
        </div>
      </div>
    </>
  );
}
