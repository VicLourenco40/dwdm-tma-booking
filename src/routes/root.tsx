import { Outlet, Link } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <header>
        <h2>Booking</h2>
        <ul>
          <Link to={'/'}>Home</Link>
          <li>Hotels</li>
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
