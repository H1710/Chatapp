import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAPI, postAPI } from '../../apis/FetchData';

import { CircularProgress } from '@mui/material';
import { getNotificationsRoute } from '../../apis/APIRoutes';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import Notification from './Notification';
import { NotificationVM } from '../../models/friendInvitation.model';
const NotificationList = () => {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const [notificationList, setNotificationList] = useState<NotificationVM[]>(
    []
  );
  const { isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => {
      return getAPI(
        `${getNotificationsRoute}/${auth?._id}`,
        auth.access_token || ''
      );
    },
    onSuccess: (data: any) => {
      if (data?.user?.friends) {
        setNotificationList(data.user.friends);
      }
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
        <div className="h-full flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
          {notificationList.length ? (
            notificationList.map((contact: NotificationVM, index: number) => {
              return <Notification contact={contact} key={index} />;
            })
          ) : (
            <p className="mt-2 ml-2">Nothing</p>
          )}
        </div>
      )}
    </>
  );
};

export default NotificationList;
