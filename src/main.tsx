import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './pages/layout/layout';
import Home from './pages/home/home';
import Hotels from './pages/hotels/hotels';
import Hotel from './pages/hotel/hotel';
import User from './pages/user/user';
import SignUp from './pages/sign-up/sign-up';
import SignIn from './pages/sign-in/sign-in';
import Booking from './pages/booking/booking';
import Review from './pages/review/review';
import './index.css';

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
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
    },
    {
      path: '/review/:bookingId',
      element: <Review />
    }
  ]
}]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
