import { Outlet, Link } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <header>
        <h2><Link to={'/'}>Booking</Link></h2>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/hotels'}>Hotels</Link></li>
          <li><Link to={'/user'}>User</Link></li>
          <li><Link to={'/sign-up'}>Sign Up</Link></li>
          <li><Link to={'/sign-in'}>Sign In</Link></li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        2024 Booking
      </footer>
    </>
  );
}
