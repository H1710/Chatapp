import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAPI, postAPI } from '../utils/FetchData';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  acceptRequestRoute,
  cancelRequestRoute,
  getNotificationsRoute,
} from '../utils/APIRoutes';
import { CircularProgress } from '@mui/material';
import { addRoom } from '../redux/reducers/authReducer';
import NotificationList from './NotificationList';
const Notification = () => {
  // const { socket } = useSelector(state => state);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.auth);

  const {
    data: dataNotifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => {
      return getAPI(`${getNotificationsRoute}/${auth?._id}`);
    },
    staleTime: 0,
    cacheTime: 0,
  });

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex items-center justify-center gap-1 mt-2">
            Loading...
            <CircularProgress size={20} color="inherit" />
          </div>
        </>
      ) : (
        <NotificationList dataNotifications={dataNotifications} auth={auth} />
      )}
      <ToastContainer />
    </>
  );
};

export default Notification;
