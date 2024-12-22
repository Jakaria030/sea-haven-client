import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../MainLayout';
import HomePage from '../pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Navigate to='/home-page'></Navigate>,
      },
      {
        path: '/home-page',
        element: <HomePage></HomePage>,
      },
    ],
  },
]);

export default router;