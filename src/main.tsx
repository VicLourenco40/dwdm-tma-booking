import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Root from './routes/root';
import Home from './routes/home';
import Hotels from './routes/hotels';
import Hotel from './routes/hotel';
import User from './routes/user';
import SignUp from './routes/sign-up';
import SignIn from './routes/sign-in';
import Booking from './routes/booking';

const router = createBrowserRouter([{
  path: '/',
  element: <Root />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/hotels',
      element: <Hotels />
    },
    {
      path: '/hotels/:hotelId',
      element: <Hotel />
    },
    {
      path: '/user',
      element: <User />
    },
    {
      path: '/sign-up',
      element: <SignUp />
    },
    {
      path: '/sign-in',
      element: <SignIn />
    },
    {
      path: '/booking/:hotelId',
      element: <Booking />
    }
  ]
}]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
