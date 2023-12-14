import React, { Suspense, lazy, useEffect } from 'react';
import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSocket } from './redux/reducers/socketReducer';
import { io } from 'socket.io-client';
import Loading from './components/Alert/Loading.jsx';
import MainLayout from './layouts/MainLayout.jsx';

const Home = lazy(() => import('./pages/Home/index.jsx'));
const Login = lazy(() => import('./pages/Auth/Login/index.jsx'));
const Register = lazy(() => import('./pages/Auth/Register/index.jsx'));
const ChatContainer = lazy(() => import('./components/ChatContainer'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io.connect(
      process.env.REACT_APP_SERVER_URL
        ? 'https://chat-app-be-ptrn.onrender.com'
        : 'http://localhost:5001',
      {
        reconnect: true,
      }
    );
    dispatch(setSocket(socket));
    return () => {
      socket.close();
    };
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        { index: true, element: <Navigate to="/login" replace /> },
        {
          path: '/login',
          element: (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '/home',
      element: (
        <Suspense fallback={<Loading />}>
          <MainLayout />
        </Suspense>
      ),
      children: [
        { element: <Home />, index: true },
        {
          path: 'chatroom/:currentRoomId',
          element: (
            <Suspense fallback={<></>}>
              <ChatContainer />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '/register',
      element: (
        <Suspense fallback={<Loading />}>
          <Register />
        </Suspense>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
