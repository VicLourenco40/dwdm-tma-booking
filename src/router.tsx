import { Layout } from './pages/layout/layout';
import { Home } from './pages/home/home';
import { Hotels } from './pages/hotels/hotels';
import { Hotel } from './pages/hotel/hotel';
import { User } from './pages/user/user';
import { Auth } from './pages/auth/auth';
import { Booking } from './pages/booking/booking';
import { Review } from './pages/review/review';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([{
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
      path: '/auth',
      element: <Auth />
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
