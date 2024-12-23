import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../MainLayout';
import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import RegisterPage from '../pages/RegisterPage';

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
  {
    path: 'register-page',
    element: <RegisterPage></RegisterPage>,
  },
  {
    path: '/*',
    element: <ErrorPage></ErrorPage>
  }
]);

export default router;