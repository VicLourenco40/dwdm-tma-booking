import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Root from './routes/root';
import Home from './routes/home';
import Hotels from './routes/hotels';

const router = createBrowserRouter([{
  path: '/',
  element: <Root />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: 'hotels',
      element: <Hotels />
    }
  ]
}]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
