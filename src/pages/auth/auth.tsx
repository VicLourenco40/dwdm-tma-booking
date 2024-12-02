import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Message } from '../../components/message/message';
import styles from './auth.module.css';

type SignIn = {
  email: string;
  password: string;
};

export function Auth() {
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState<SignIn>({email: '', password: ''});
  const [signInMessage, setSignInMessage] = useState({message: '', success: true});

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
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles['sign-in']}>
        <h2>Sign In</h2>
        <form className={styles.form} onSubmit={handleSignIn}>
          <label htmlFor={'sign-in-email'}>Email</label>
          <input type={'email'} id={'sign-in-email'} name={'sign-in-email'} required
            onChange={event => setSignIn({...signIn, email: event.target.value})} />

          <label htmlFor={'sign-in-password'}>Password</label>
          <input type={'password'} id={'sign-in-password'} name={'sign-in-password'} required minLength={6}
            onChange={event => setSignIn({...signIn, password: event.target.value})} />

          <input className={styles['form-submit']} type={'submit'} value={'Sign In'} />
        </form>
        {!signInMessage.success && <Message message={signInMessage.message} success={signInMessage.success} />}
      </div>
      <div className={styles['sign-up']}>
        <h2>Sign Up</h2>
      </div>
    </div>
  );
}
