import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageRender from './PageRender';
import { useDispatch } from 'react-redux';
import { setSocket } from './redux/reducers/socketReducer';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io.connect('http://localhost:5001', { reconnect: true });
    dispatch(setSocket(socket));
    return () => {
      socket.close();
    };
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        {/* <Route path="/register" element={<Register />} />
        <Route path="/register/confirmOTP" element={<ConfirmOTP />} />
        <Route path="/register/avatar" element={<SetAvatar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} /> */}
        <Route path="/" element={<PageRender />} />
        <Route path="/:page" element={<PageRender />} />
        <Route path="/:page/:slug" element={<PageRender />} />
      </Routes>
    </Router>
  );
}

export default App;
