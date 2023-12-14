import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAPI, postAPI } from '../../utils/FetchData';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { CircularProgress } from '@mui/material';
import { addRoom } from '../../redux/reducers/authReducer';
import NotificationList from '../NotificationList/index';
const Notification = () => {
  // const { socket } = useSelector(state => state);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.auth);

  return (
    <div className="p-2 w-full h-full flex flex-col">
      <div className="px-[10px]">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Notifications</p>
        </div>
      </div>

      <br />
      <NotificationList auth={auth} />
    </div>
  );
};

export default Notification;
