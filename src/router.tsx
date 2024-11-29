import { Layout } from './pages/layout/layout';
import { Home } from './pages/home/home';
import { Hotels } from './pages/hotels/hotels';
import { Hotel } from './pages/hotel/hotel';
import { User } from './pages/user/user';
import { SignUp } from './pages/sign-up/sign-up';
import { SignIn } from './pages/sign-in/sign-in';
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
