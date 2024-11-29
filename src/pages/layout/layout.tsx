import { Link, Outlet } from 'react-router-dom';

import './layout.css';

export function Layout() {
  return (
    <>
      <header>
        <h2><Link to={'/'}>Booking</Link></h2>
        <nav>
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/hotels'}>Hotels</Link></li>
            <li><Link to={'/user'}>User</Link></li>
          </ul>
        </nav>
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
