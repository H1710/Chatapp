import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSocket } from './redux/reducers/socketReducer';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import Home from './pages';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatContainer from './components/ChatContainer';
import IntroComponent from './components/IntroComponent';
import Profile from './components/profile';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io.connect(
      process.env.SERVER_URL
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
      element: <Home />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: '/home', element: <IntroComponent /> },
        { path: 'chatroom/:currentRoomId', element: <ChatContainer /> },
        { path: 'profile/:userId', element: <Profile /> },
      ],
      // errorElement: <ErrorPage />,
    },

    {
      path: '/login',
      element: <Login />,
      // errorElement: <ErrorPage />,
    },
    {
      path: '/register',
      element: <Register />,
      // errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
