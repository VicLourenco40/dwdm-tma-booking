import { FormEvent, useEffect, useState } from "react";

type Country = {
  id: string;
  name: string;
}

type User = {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  countryId: string;
  terms: boolean;
}

export default function SignUp() {
  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    await fetch('https://api-tma-2024-production.up.railway.app/countries')
      .then(response => response.json())
      .then(data => setCountries(data.countries));
  }

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const [countries, setCountries] = useState<Country[]>([]);

  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    birthDate: '',
    countryId: '',
    terms: false
  });

  return (
    <>
      <h1>Sign Up</h1>

      <form onSubmit={handleSignUp}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          minLength={3}
          required
          onChange={event => (
            setUser(user => ({...user, name: event.target.value}))
          )}
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          required
          onChange={event => (
            setUser(user => ({...user, email: event.target.value}))
          )}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          minLength={6}
          required
          onChange={event => (
            setUser(user => ({...user, password: event.target.value}))
          )}
        />

        <label htmlFor='birth-date'>Birth date</label>
        <input
          type='date'
          name='birth-date'
          id='birth-date'
          required
          onChange={event => (
            setUser(user => ({...user, birthDate: event.target.value}))
          )}
        />

        <label htmlFor='country'>Country</label>
        <select
          name='country'
          id='country'
          required
          onChange={event => (
            setUser(user => ({...user, countryId: event.target.value}))
          )}
        >
          <option value=''>Select</option>
          {countries.map(country => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>

        <label htmlFor="terms">Terms and conditions</label>
        <input
          type="checkbox"
          name="terms"
          id="terms"
          required
          onChange={event => (
            setUser(user => ({...user, terms: event.target.value === 'on'}))
          )}
        />

        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
}
