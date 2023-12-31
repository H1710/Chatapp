import React from 'react';
import { postAPI } from '../../apis/FetchData';
import {
  acceptRequestRoute,
  cancelRequestRoute,
  recallRequestRoute,
  sendRequestRoute,
} from '../../apis/APIRoutes';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import CustomButton from '../Button/CustomButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { User } from '../../models/user.model';
import { FriendInvitaionOperation } from '../../models/friendInvitation.model';

const Request: React.FC<{ contact: User }> = ({ contact }) => {
  const queryClient = useQueryClient();
  const auth = useSelector((state: RootState) => state.auth.auth);

  const { mutate: sendRequest, isLoading: loadingSendRequest } = useMutation({
    mutationFn: (info: FriendInvitaionOperation) => {
      return postAPI(sendRequestRoute, info, '');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['search'] });
    },
  });

  const handleSendRequest = (receiver: User) => {
    try {
      sendRequest({
        senderId: auth._id,
        receiverId: receiver._id,
      });
    } catch (err) {}
  };

  const { mutate: cancelRequest, isLoading: loadingCancelRequest } =
    useMutation({
      mutationFn: (info: FriendInvitaionOperation) => {
        return postAPI(cancelRequestRoute, info, '');
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
      onSuccess: data => {
        queryClient.invalidateQueries('refresh_token');
        queryClient.invalidateQueries({ queryKey: ['search'] });
        toast.success(data.data.message);
      },
    });

  const handleCancelRequest = (sender: User) => {
    try {
      cancelRequest({
        receiverId: auth._id,
        senderId: sender._id,
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
        queryClient.invalidateQueries({ queryKey: ['search'] });
      },
    });

  const handleAcceptRequest = (sender: User) => {
    try {
      acceptRequest({
        receiverId: auth._id,
        senderId: sender._id,
      });
    } catch (err) {}
  };

  const { mutate: recallRequest, isLoading: loadingrecallRequest } =
    useMutation({
      mutationFn: (info: FriendInvitaionOperation) => {
        return postAPI(recallRequestRoute, info, '');
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
      onSuccess: data => {
        queryClient.invalidateQueries({ queryKey: ['search'] });
      },
    });

  const handleRecallRequest = (receiver: User) => {
    try {
      recallRequest({
        senderId: auth._id,
        receiverId: receiver._id,
      });
    } catch (err) {}
  };
  return (
    <div className="flex p-[10px] justify-center transition-colors lg:justify-start items-center rounded">
      <div className="flex flex-row items-center gap-2 truncate">
        {contact?.avatar ? (
          <img
            src={contact.avatar}
            alt=""
            className="w-[50px] h-[50px] rounded-full border border-gray-200"
          />
        ) : (
          <div className="text-3xl text-white h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
            <p>{contact?.firstname[0]}</p>
          </div>
        )}

        <p className=" text-lg text-[#33485c] flex-1 font-normal truncate text-center">
          {contact?.firstname + ' ' + contact?.lastname}
        </p>
      </div>
      <div className="flex flex-row flex-1 justify-end">
        {contact._id === auth._id ? (
          <button className="w-36 h-10 text-center"></button>
        ) : contact.friends.length === 0 || contact.friends[0].status === 0 ? (
          <CustomButton
            text={'Add friend'}
            handleSubmit={() => handleSendRequest(contact)}
            isLoading={loadingSendRequest}
            classContent={
              'w-32 h-10 bg-[#e5efff] hover:bg-[#c7e0ff] text-center text-[#005ae0] rounded'
            }
            type={'button'}
          />
        ) : contact.friends[0].status === 3 ? (
          <div>Friend</div>
        ) : contact.friends[0].senderId === auth._id ? (
          <CustomButton
            text={'Cancel request'}
            handleSubmit={() => handleRecallRequest(contact)}
            isLoading={loadingrecallRequest}
            classContent={
              'w-36 h-10 bg-[#eaedf0] hover:bg-[#dfe2e7] text-center rounded'
            }
            type={'button'}
          />
        ) : (
          <>
            {loadingAcceptRequest || loadingCancelRequest ? (
              <div className="flex items-center justify-center gap-1 rounded">
                Loading...
                <CircularProgress size={20} color="inherit" />
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleAcceptRequest(contact);
                  }}
                  className="w-20 h-10 bg-[#e5efff] hover:bg-[#c7e0ff] text-center text-[#005ae0] rounded"
                >
                  Agree
                </button>
                <button
                  onClick={() => {
                    handleCancelRequest(contact);
                  }}
                  className="w-20 h-10 bg-[#eaedf0] hover:bg-[#dfe2e7] text-center rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Request;
