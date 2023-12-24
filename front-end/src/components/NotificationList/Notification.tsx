import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { postAPI } from '../../apis/FetchData';
import { acceptRequestRoute, cancelRequestRoute } from '../../apis/APIRoutes';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { CircularProgress } from '@mui/material';
import {
  FriendInvitaionOperation,
  NotificationVM,
} from '../../models/friendInvitation.model';
interface NotificationProps {
  contact: NotificationVM;
}

const Notification: React.FC<NotificationProps> = ({ contact }) => {
  const queryClient = useQueryClient();
  const auth = useSelector((state: RootState) => state.auth.auth);

  const { mutate: cancelRequest, isLoading: loadingCancelRequest } =
    useMutation({
      mutationFn: (info: FriendInvitaionOperation) => {
        return postAPI(cancelRequestRoute, info, '');
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
      onSuccess: data => {
        queryClient.invalidateQueries(['notifications']);
        queryClient.invalidateQueries(['refresh_token']);
        toast.success(data.message);
      },
    });

  const handleCancelRequest = (sender: NotificationVM) => {
    try {
      cancelRequest({
        receiverId: auth._id,
        senderId: sender.senderId._id,
      });
    } catch (err) {}
  };

  const { mutate: acceptRequest, isLoading: loadingAcceptRequest } =
    useMutation({
      mutationFn: (info: FriendInvitaionOperation) => {
        return postAPI(acceptRequestRoute, info, '');
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
      onSuccess: data => {
        toast.success(data.data.message);
        queryClient.invalidateQueries(['refresh_token']);
        queryClient.invalidateQueries(['notifications']);
      },
    });

  const handleAcceptRequest = (sender: NotificationVM) => {
    try {
      acceptRequest({
        receiverId: auth._id,
        senderId: sender.senderId._id,
      });
    } catch (err) {}
  };
  return (
    <div className="flex flex-row items-center p-[10px] cursor-pointer hover:bg-white/20 gap-2 justify-between">
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
          {contact?.senderId.firstname + ' ' + contact?.senderId.lastname}
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
};

export default Notification;
