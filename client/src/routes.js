import { useRoutes } from 'react-router-dom';
import Home from './pages/home';
import Cloudy from './pages/cloudy';
import Fligths from './pages/flights';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/cloudy',
      element: <Cloudy />
    },
    {
      path: '/flights',
      element: <Fligths />
    }
  ]);
}
