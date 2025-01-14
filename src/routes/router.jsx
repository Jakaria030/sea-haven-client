import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../MainLayout';
import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import RoomsPage from '../pages/RoomsPage';
import RoomDetailsPage from '../pages/RoomDetailsPage';
import axios from 'axios';
import MyBookingPage from '../pages/MyBookingPage';
import ContactPage from '../pages/ContactPage';
import AboutPage from '../pages/AboutPage';
import PrivateRoute from './PrivateRoute';

const baseURL = import.meta.env.VITE_RootURL;

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
      {
        path: '/room-page',
        element: <RoomsPage></RoomsPage>,
      },
      {
        path: '/room-details/:id',
        element: <RoomDetailsPage></RoomDetailsPage>,
        loader: async({params}) => {
          try{
            const {data} = await axios.get(`${baseURL}/rooms/${params.id}`)
            return data;
          }catch(err){
            throw new Response('Failed to load room details.');
          }
        }
      },
      {
        path: '/my-bookings-page',
        element: <PrivateRoute>
          <MyBookingPage></MyBookingPage>
        </PrivateRoute>,
      },
      {
        path: '/contact-page',
        element: <ContactPage></ContactPage>,
      },
      {
        path: '/about-page',
        element: <AboutPage></AboutPage>,
      },
    ],
  },
  {
    path: 'register-page',
    element: <RegisterPage></RegisterPage>,
  },
  {
    path: '/login-page',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/*',
    element: <ErrorPage></ErrorPage>
  }
]);

export default router;