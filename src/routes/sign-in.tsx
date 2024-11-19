import { FormEvent, useState } from 'react';

type User = {
  email: string;
  password: string;
}

export default function SignIn() {
  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
