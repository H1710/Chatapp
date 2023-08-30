import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import ChatContainer from '../components/ChatContainer';
import io from 'socket.io-client';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../components/Navigation';
import SetInfo from '../components/SetInfo';
import { useQuery } from 'react-query';
import { getAPI } from '../utils/FetchData';
import { ToastContainer, toast } from 'react-toastify';
import { refreshRoute } from '../utils/APIRoutes';
import Loading from '../components/alert/Loading';
import { seft } from '../redux/reducers/authReducer';
import logoHome from '../components/logo/logoHome.png';
import { setSocket } from '../redux/reducers/socketReducer';

function Chat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logged, setLogged] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [navSelect, setNavSelect] = useState('messages');
  const [onlineUsers, setOnlineUsers] = useState(undefined);
  const [offlineUsersTime, setOfflineUsersTime] = useState(undefined);
  const socket = useRef();

  const currentRoom = useSelector(state => state.chatroom.currentRoom);

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem('signed')) {
        navigate('/login');
      } else {
        setLogged(!logged);
      }
    };
    checkUser();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['refresh_token'],
    queryFn: () => {
      return getAPI(refreshRoute);
    },
    onSuccess: data => {
      dispatch(
        seft({ ...data.data.user, access_token: data.data.access_token })
      );
      socket.current = io(process.env.SERVER_URL ?? 'http://localhost:5001');
      // socket.current = io('https://chat-app-be1.onrender.com/api/v1');
      socket.current.emit('login', { userId: data.data.user._id });
      socket.current?.on('onlineUser', data => {
        setOnlineUsers(data.onlineUsers);
      });

      dispatch(setSocket(socket.current));
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    enabled: logged,
  });

  useEffect(() => {
    return () => {
      socket.current?.close();
    };
  }, []);

  // useEffect(() => {
  //   const handleNotification = async () => {
  //     if (currentUser) {
  //       const data = await axios.get(`${getRequestRoute}/${currentUser._id}`);
  //       if (data.status === 200) {
  //         notification = data.data.data.length;
  //       }
  //     }
  //   };
  //   handleNotification();
  // }, []);

  const handleSetNav = options => {
    setNavSelect(options);
  };

  return isLoading || !logged ? (
    <Loading />
  ) : (
    <div className="flex flex-row items-center justify-center w-full h-[100vh] bg-[#cdcfd3]">
      <Navigation handleSetNav={handleSetNav} navSelect={navSelect} />
      {navSelect === 'info' ? (
        <SetInfo />
      ) : (
        <>
          <Contacts
            contacts={contacts}
            currentRoom={currentRoom}
            socket={socket}
            onlineUsers={onlineUsers}
            navSelect={navSelect}
          />

          <div
            className={`${
              navSelect === 'search-friends' || navSelect === 'notifications'
                ? 'md:w-0'
                : 'md:w-[75%]'
            } bg-white h-full flex-1 flex flex-col justify-between overflow-hidden border-l border-[#dbdfe2]`}
          >
            {currentRoom ? (
              <ChatContainer
                currentChat={currentChat}
                onlineUsers={onlineUsers}
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                <img
                  src={logoHome}
                  alt=""
                  className="w-[5rem] h-[5rem] flex items-center content-center"
                />
                <h2 data-text="CHAT_APP" className="text-[3rem] font-light">
                  CHAT_APP
                </h2>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
