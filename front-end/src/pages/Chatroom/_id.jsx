import React, { useEffect, useState } from 'react';
import ChatInput from '../../components/Chatroom/ChatInput';
import { sendMessageRoute, getChatroomMessages } from '../../utils/APIRoutes';

import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { getAPI, postAPI } from '../../utils/FetchData';
import { useParams } from 'react-router-dom';
import Header from '../../components/Chatroom/Header';
import ChatContainer from '../../components/Chatroom/ChatContainer';

function ChatroomDetail() {
  const [messages, setMessages] = useState('');
  const auth = useSelector(state => state.auth.auth);

  const socket = useSelector(state => state.socket.socket);
  const onlineUsers = useSelector(state => state.user.onlineUsers);

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };
  const { currentRoomId } = useParams();
  const {
    data: dataRoom,
    isLoading: loadDataRoom,
    isError: isExistChatRoom,
  } = useQuery({
    queryKey: ['getMessageRoom', currentRoomId],
    queryFn: () => {
      return getAPI(
        `${getChatroomMessages}/${currentRoomId}`,
        auth?.access_token
      );
    },
    onSuccess: data => {
      setMessages(data.data.chatroom.messages);
      socket.emit('join-room', {
        chatRoomId: data.data.chatroom._id,
      });
    },
    onError: (error, variables, context) => {
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

  const {
    mutate: sendMessage,
    isLoading: loadingSendMessage,
    isSuccess: isSendMessage,
  } = useMutation({
    mutationFn: info => {
      return postAPI(sendMessageRoute, info);
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: data => {
      setMessages(prev => [
        ...prev,
        {
          content: data.data.content,
          senderId: {
            _id: auth._id,
            avatar: auth.avatar,
            firstname: auth.firstname,
            lastname: auth.lastname,
          },
          updatedAt: Date.now(),
        },
      ]);
      socket.emit('send-msg', {
        chatRoomId: dataRoom.data.chatroom._id,
        content: data.data.content,
        senderId: {
          _id: auth._id,
          avatar: auth.avatar,
          firstname: auth.firstname,
          lastname: auth.lastname,
        },
        updatedAt: Date.now(),
      });
    },
  });

  const handleSendMsg = async msg => {
    await sendMessage({
      chatRoomId: currentRoomId,
      senderId: auth._id,
      message: msg,
    });
  };

  useEffect(() => {
    socket?.on('receive-msg', data => {
      setMessages(prev => [
        ...prev,
        {
          _id: data.chatRoomId,
          content: data.content,
          senderId: data.senderId,
          updatedAt: Date.now(),
        },
      ]);
    });
    return () => socket.off('receive-msg');
  }, [socket]);

  // useLayoutEffect(() => {
  //   arrivalMessages && setMessages(prev => [...prev, arrivalMessages]);
  // }, [arrivalMessages]);

  return (
    <>
      <Header dataRoom={dataRoom} onlineUsers={onlineUsers} auth={auth} />
      <ChatContainer
        loadDataRoom={loadDataRoom}
        messages={messages}
        auth={auth}
      />
      <ChatInput handleSendMsg={handleSendMsg} />
      <ToastContainer />
    </>
  );
}

export default ChatroomDetail;
