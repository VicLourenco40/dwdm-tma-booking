import { FormEvent, useState } from 'react';

type User = {
  email: string;
  password: string;
}

export default function SignIn() {
  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch('https://api-tma-2024-production.up.railway.app/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(data);

      if (response.status === 201) {
        localStorage.setItem('token', data.token);
      }
    });
  }

  const [user, setUser] = useState<User>({
    email: '',
    password: ''
  });

  return (
    <>
      <h1>Sign In</h1>

      <form onSubmit={handleSignIn}>
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

        <input type='submit' value='Sign In' />
      </form>
    </>
  );
}
