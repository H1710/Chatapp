import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { acceptRequestRoute, cancelRequestRoute } from '../../utils/APIRoutes';
import { postAPI } from '../../utils/FetchData';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const NotificationList = ({ dataNotifications, auth }) => {
  const queryClient = useQueryClient();

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
    <div className="w-full h-[400px]">
      {dataNotifications.data?.user &&
      dataNotifications.data?.user.friends.length !== 0 ? (
        <div className="flex flex-col gap-2 overflow-y-scroll h-[400px] scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded mb-5">
          {dataNotifications.data?.user.friends.map((contact, index) => {
            return (
              <div
                className="flex flex-row items-center px-3 py-3 cursor-pointer border-b-[1px] hover:bg-white/20 gap-2 justify-between"
                key={index}
              >
                <div className="flex flex-row items-center gap-2 truncate">
                  {contact.senderId?.avatar ? (
                    <img
                      src={contact.senderId?.avatar}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full border border-gray-100"
                    />
                  ) : (
                    <div className="text-3xl text-white h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
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
          })}
        </div>
      ) : (
        <p className="mt-2 ml-2">Nothing</p>
      )}
    </div>
  );
};

export default NotificationList;
