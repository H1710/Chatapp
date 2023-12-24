import React, { useEffect, useState } from 'react';
import ChatInput from '../../components/Chatroom/ChatInput';
import { sendMessageRoute, getChatroomMessages } from '../../apis/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { getAPI, postAPI } from '../../apis/FetchData';
import { useParams } from 'react-router-dom';
import Header from '../../components/Chatroom/Header';
import ChatContainer from '../../components/Chatroom/ChatContainer';
import { RootState } from '../../redux/reducers';
import { IChatroom } from '../../models/chatroom.model';

function ChatroomDetail() {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const [chatroom, setChatroom] = useState<IChatroom>({
    _id: '',
    name: '',
    userIds: [],
    messages: [],
  });
  const socket = useSelector((state: RootState) => state.socket.socket);
  const onlineUsers = useSelector((state: RootState) => state.user.onlineUsers);

  const { currentRoomId } = useParams();
  const { data: dataRoom, isLoading: loadDataRoom } = useQuery({
    queryKey: ['getMessageRoom', currentRoomId],
    queryFn: () => {
      return getAPI(
        `${getChatroomMessages}/${currentRoomId}`,
        auth.access_token || ''
      );
    },
    onSuccess: (data: any) => {
      setChatroom(data.chatroom);
      socket.emit('join-room', {
        chatRoomId: data.chatroom._id,
      });
    },
    onError: (error: any) => {
      if (error.response?.status === 404) {
        toast.error('Chat room not found.');
      } else {
        toast.error('An error occurred while fetching chat room data.');
      }
    },
    staleTime: Infinity,
    cacheTime: 0,
    enabled: currentRoomId && auth?.access_token ? true : false,
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: (info: any) => {
      return postAPI(sendMessageRoute, info, '');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data: any) => {
      setChatroom(prev => {
        const temp = { ...prev };
        temp.messages.push({
          content: data.content,
          senderId: {
            _id: auth._id,
            avatar: auth.avatar,
            firstname: auth.firstname,
            lastname: auth.lastname,
          },
          updatedAt: Date.now(),
        });
        return temp;
      });
      if (dataRoom) {
        socket.emit('send-msg', {
          chatRoomId: dataRoom.chatroom._id,
          content: data.content,
          senderId: {
            _id: auth._id,
            avatar: auth.avatar,
            firstname: auth.firstname,
            lastname: auth.lastname,
          },
          updatedAt: Date.now(),
        });
      }
    },
  });

  const handleSendMsg = (msg: string) => {
    sendMessage({
      chatRoomId: currentRoomId,
      senderId: auth._id,
      message: msg,
    });
  };

  useEffect(() => {
    socket?.on('receive-msg', (data: any) => {
      setChatroom(prev => {
        const temp = { ...prev };
        temp.messages.push({
          _id: data.chatRoomId,
          content: data.content,
          senderId: data.senderId,
          updatedAt: Date.now(),
        });
        return temp;
      });
    });
    return () => socket.off('receive-msg');
  }, [socket]);

  return (
    <>
      <Header chatroom={chatroom} onlineUsers={onlineUsers} auth={auth} />
      <ChatContainer
        loadDataRoom={loadDataRoom}
        messages={chatroom.messages}
        auth={auth}
      />
      <ChatInput handleSendMsg={handleSendMsg} />
      <ToastContainer />
    </>
  );
}

export default ChatroomDetail;
