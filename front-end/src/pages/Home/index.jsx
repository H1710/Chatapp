import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Contacts from '../../components/Contacts';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/Navigation';
import { useQuery } from 'react-query';
import { getAPI } from '../../utils/FetchData';
import { ToastContainer, toast } from 'react-toastify';
import { refreshRoute } from '../../utils/APIRoutes';
import Loading from '../../components/alert/Loading';
import { seft } from '../../redux/reducers/authReducer';
import { addOnlineUser } from '../../redux/reducers/userReducer';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logged, setLogged] = useState(false);
  const [navSelect, setNavSelect] = useState('messages');

  const socket = useSelector(state => state.socket.socket);

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
      socket.emit('login', { userId: data.data.user._id });
      socket.on('onlineUser', data => {
        dispatch(addOnlineUser(data.onlineUsers));
      });
    },
    onError: error => {
      toast.error(error.response.data.message);
    },
    enabled: logged,
  });

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

  return (
    <div className="flex flex-row items-center justify-center w-full h-[100vh] bg-blue-300 bg-opacity-30">
      <>
        <Navigation navSelect={navSelect} handleSetNav={handleSetNav} />
        <>
          <Contacts navSelect={navSelect} />

          <div
            className={`${
              navSelect === 'search-friends' || navSelect === 'notifications'
                ? 'md:w-0'
                : 'md:w-[75%]'
            } bg-white h-full flex-1 flex flex-col justify-between overflow-hidden border-l border-[#dbdfe2]`}
          >
            <Outlet />
          </div>
        </>
      </>
      <ToastContainer />
    </div>
  );
}

export default Home;
