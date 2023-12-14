import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ProfileBar from '../components/ProfileBar/index';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import NavigationBar from '../components/NavigationBar/index';
import { useQuery } from 'react-query';
import { getAPI } from '../utils/FetchData';
import { ToastContainer, toast } from 'react-toastify';
import { refreshRoute } from '../utils/APIRoutes';
import { seft } from '../redux/reducers/authReducer';
import { addOnlineUser } from '../redux/reducers/userReducer';

function MainLayout() {
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

  const handleSetNav = options => {
    setNavSelect(options);
  };

  return (
    <div className="flex flex-row items-center justify-center w-full h-[100vh] bg-blue-300 bg-opacity-30">
      <NavigationBar navSelect={navSelect} handleSetNav={handleSetNav} />
      <ProfileBar navSelect={navSelect} />

      <div
        className={`${
          navSelect === 'search-friends' || navSelect === 'notifications'
            ? 'md:w-0'
            : 'md:w-[75%]'
        } bg-white h-full flex-1 flex flex-col overflow-hidden border border-[#dbdfe2]`}
      >
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}

export default MainLayout;
