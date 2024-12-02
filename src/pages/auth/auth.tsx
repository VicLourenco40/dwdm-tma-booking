import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loading } from '../../components/loading/loading';
import { Message } from '../../components/message/message';
import styles from './auth.module.css';

type SignIn = {
  email: string;
  password: string;
};

type SignUp = {
  name: string;
  email: string;
  password: string;
  birth_date: string;
  country_id: string;
  terms: boolean;
};

type Country = {
  id: string;
  name: string;
}

export function Auth() {
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState<SignIn>({email: '', password: ''});
  const [signInMessage, setSignInMessage] = useState({message: '', success: true});
  const [signUp, setSignUp] = useState<SignUp>({name: '', email: '', password: '', birth_date: '', country_id: '', terms: false});
  const [signUpMessage, setSignUpMessage] = useState({message: '', success: true});
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

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
      getCountries()
    ])
    .then(() => setLoading(false));
  }, []);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch('https://api-tma-2024-production.up.railway.app/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signIn)
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(response, data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/user');
      }

      setSignInMessage({message: data.message, success: false});
    });
  }

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(signUp);

    await fetch('https://api-tma-2024-production.up.railway.app/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUp)
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(response, data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/user');
      }

      setSignUpMessage({message: data.message, success: false});
    });
  }

  if (loading) return (<Loading />);

  return (
    <div className={styles.container}>
      <div className={styles['sign-in']}>
        <h2>Sign In</h2>
        <form className={styles.form} onSubmit={handleSignIn}>
          <label htmlFor={'sign-in-email'}>Email</label>
          <input type={'email'} id={'sign-in-email'} name={'sign-in-email'} required
            placeholder={'Enter your email address'}
            onChange={event => setSignIn({...signIn, email: event.target.value})} />

          <label htmlFor={'sign-in-password'}>Password</label>
          <input type={'password'} id={'sign-in-password'} name={'sign-in-password'} required minLength={6}
            placeholder={'Enter your password'}
            onChange={event => setSignIn({...signIn, password: event.target.value})} />

          <input className={styles['form-submit']} type={'submit'} value={'Sign In'} />
        </form>
        {!signInMessage.success && <Message message={signInMessage.message} success={signInMessage.success} />}
      </div>
      <div className={styles['sign-up']}>
        <h2>Sign Up</h2>
        <form className={styles.form} onSubmit={handleSignUp}>
          <label htmlFor={'sign-up-name'}>Name</label>
          <input type={'text'} name={'sign-up-name'} id={'sign-up-name'} required minLength={3}
            placeholder={'Enter your first and last name'}
            onChange={event => setSignUp({...signUp, name: event.target.value})} />

          <label htmlFor={'sign-up-email'}>Email</label>
          <input type={'email'} name={'sign-up-email'} id={'sign-up-email'} required
            placeholder={'Enter your email address'}
            onChange={event => setSignUp({...signUp, email: event.target.value})} />

          <label htmlFor={'sign-up-password'}>Password</label>
          <input type={'password'} name={'sign-up-password'} id={'sign-up-password'} required minLength={6}
            placeholder={'Enter your password'}
            onChange={event => setSignUp({...signUp, password: event.target.value})} />

          <label htmlFor={'sign-up-birth-date'}>Date of birth</label>
          <input type={'date'} name={'sign-up-birth-date'} id={'sign-up-birth-date'} required
            onChange={event => setSignUp({...signUp, birth_date: event.target.value})} />

          <label htmlFor={'sign-up-country'}>Country</label>
          <select name={'sign-up-country'} id={'sign-up-country'} required
            onChange={event => setSignUp({...signUp, country_id: event.target.value})} >
            <option value={''}>Select</option>
            {countries.map(country => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))}
          </select>

          <div className={styles['form-row']}>
            <label htmlFor={'sign-up-terms'}>Terms of service</label>
            <input type={'checkbox'} name={'sign-up-terms'} id={'sign-up-terms'} required
              onChange={event => setSignUp({...signUp, terms: event.target.value === 'on'})} />
          </div>

          <input className={styles['form-submit']} type={'submit'} value={'Sign Up'} />
        </form>
        {!signUpMessage.success && <Message message={signUpMessage.message} success={signUpMessage.success} />}
      </div>
    </div>
  );
}
