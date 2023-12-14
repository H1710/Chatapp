import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAPI, postAPI } from '../../utils/FetchData';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import {
  acceptRequestRoute,
  cancelRequestRoute,
  getNotificationsRoute,
} from '../../utils/APIRoutes';
const NotificationList = ({ auth }) => {
  const queryClient = useQueryClient();
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
  const { mutate: cancelRequest, isLoading: loadingCancelRequest } =
    useMutation({
      mutationFn: info => {
        return postAPI(cancelRequestRoute, info);
      },
      onError: error => {
        toast.error(error.response.data.message);
      },
      onSuccess: data => {
        queryClient.invalidateQueries(['notifications']);
        queryClient.invalidateQueries(['refresh_token']);
        toast.success(data.data.message);
      },
    });

  const handleCancelRequest = async sender => {
    try {
      await cancelRequest({
        myId: auth._id,
        senderId: sender.senderId._id,
      });
      sender.isCancel = 0;
    } catch (err) {}
  };

  const { mutate: acceptRequest, isLoading: loadingAcceptRequest } =
    useMutation({
      mutationFn: info => {
        return postAPI(acceptRequestRoute, info);
      },
      onError: error => {
        toast.error(error.response.data.message);
      },
      onSuccess: data => {
        toast.success(data.data.message);
        queryClient.invalidateQueries(['refresh_token']);
        queryClient.invalidateQueries(['notifications']);
      },
    });

  const handleAcceptRequest = async sender => {
    try {
      await acceptRequest({
        myId: auth._id,
        senderId: sender.senderId._id,
      });
    } catch (err) {}
  };

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
          {dataNotifications.data?.user ? (
            dataNotifications.data?.user.friends.map((contact, index) => {
              return (
                <div
                  className="flex flex-row items-center p-[10px] cursor-pointer hover:bg-white/20 gap-2 justify-between"
                  key={index}
                >
                  <div className="flex flex-row items-center gap-2 truncate">
                    {contact.senderId?.avatar ? (
                      <img
                        src={contact.senderId?.avatar}
                        alt=""
                        className="w-[48px] h-[48px] rounded-full border border-gray-100"
                      />
                    ) : (
                      <div className="text-3xl text-white h-[48px] w-[48px] flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
                        <p>{contact?.senderId.firstname[0]}</p>
                      </div>
                    )}

                    <p className=" text-lg text-[#33485c] flex-1 font-normal truncate text-center">
                      {contact?.senderId.firstname +
                        ' ' +
                        contact?.senderId.lastname}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {contact.status === 3 ? (
                      <p>Accepted</p>
                    ) : contact.status === 0 ? (
                      <p>Cancelled</p>
                    ) : (
                      <>
                        {loadingAcceptRequest || loadingCancelRequest ? (
                          <div className="flex items-center justify-center gap-1">
                            Loading...
                            <CircularProgress size={20} color="inherit" />
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                handleAcceptRequest(contact);
                              }}
                              className="w-20 h-10 bg-[#e5efff] hover:bg-[#c7e0ff] text-center text-[#005ae0]"
                            >
                              Agree
                            </button>
                            <button
                              onClick={() => {
                                handleCancelRequest(contact);
                              }}
                              className="w-20 h-10 bg-[#eaedf0] hover:bg-[#dfe2e7] text-center"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
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
