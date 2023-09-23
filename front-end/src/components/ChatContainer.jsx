import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import ChatInput from './ChatInput';
import { sendMessageRoute, getChatroomMessages } from '../utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import LoadingCompoent from './alert/LoadingCompoent';
import { useMutation, useQuery } from 'react-query';
import { getAPI, postAPI } from '../utils/FetchData';
import { useParams } from 'react-router-dom';

function ChatContainer() {
  const [messages, setMessages] = useState('');
  const scrollRef = useRef();
  const auth = useSelector(state => state.auth.auth);
  const { currentRoomId } = useParams();

  const socket = useSelector(state => state.socket.socket);
  const onlineUsers = useSelector(state => state.user.onlineUsers);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setMinutes(minutes => minutes + 1);
  //   }, 60000);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   // console.log(offlineUsersTime);
  //   // if (currentChat?._id)
  //   //   console.log(Date.now() - Date(offlineUsersTime[currentChat._id]));
  //   if (currentChat?._id) {
  //     const handleDate = () => {
  //       let utcDate = new Date(offlineUsersTime[currentChat._id]);
  //       let now = new Date();
  //       // console.log(
  //       //   Math.max(
  //       //     1,
  //       //     Math.floor((now.getTime() - utcDate.getTime()) / (1000 * 60))
  //       //   )
  //       // );
  //       setDate(
  //         Math.max(
  //           1,
  //           Math.floor((now.getTime() - utcDate.getTime()) / (1000 * 60))
  //         )
  //       );
  //       setMinutes(0);
  //     };
  //     handleDate();
  //   } else {
  //     setDate(false);
  //   }
  // }, [currentChat]);

  // useEffect(() => {
  //   if (currentChat?._id && !onlineUsers?.includes(currentChat._id)) {
  //     setDate(1);
  //     setMinutes(0);
  //   } else {
  //     setDate(null);
  //   }
  // }, [onlineUsers]);

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const {
    data: dataRoom,
    isLoading: loadDataRoom,
    isError: isExistChatRoom,
  } = useQuery({
    queryKey: ['getMessageRoom', currentRoomId],
    queryFn: () => {
      return getAPI(
        `${getChatroomMessages}/${currentRoomId}`,
        auth.access_token
      );
    },
    onSuccess: data => {
      setMessages(data.data.chatroom.messages);
      socket.emit('join-room', {
        chatRoomId: data.data.chatroom._id,
      });
    },
    onError: error => {
      toast.error(error.response.data.message);
    },
    staleTime: Infinity,
    cacheTime: 0,
  });

  const getNameContact = contact => {
    if (contact.userIds.length === 2) {
      if (contact.userIds[0]._id === auth._id) {
        return contact.userIds[1].firstname + ' ' + contact.userIds[1].lastname;
      } else {
        return contact.userIds[0].firstname + ' ' + contact.userIds[0].lastname;
      }
    } else {
      return contact.name;
    }
  };

  const getUserIdContact = contact => {
    if (contact.userIds.length === 2) {
      if (contact.userIds[0]._id === auth._id) {
        return contact.userIds[1]._id;
      } else {
        return contact.userIds[0]._id;
      }
    }
  };

  const getAvatarContact = contact => {
    if (contact.userIds.length === 2) {
      if (contact.userIds[0]._id === auth._id) {
        return contact.userIds[1]?.avatar;
      } else {
        return contact.userIds[0]?.avatar;
      }
    }
  };

  // if (isLoading) console.log(data);

  // useLayoutEffect(() => {
  //   const handleSetMessages = async () => {
  //     if (currentChat) {
  //       setMessages([]);
  //       dispatch({ type: 'ALERT', payload: { loading: true } });
  //       const myId = auth._id;
  //       const response = await axios.post(
  //         `${getMessagesRoute}/${currentRoom}`,
  //         { myId }
  //       );
  //       setMessages(response.data.data);
  //       dispatch({ type: 'ALERT', payload: { loading: false } });
  //     }
  //   };

  //   handleSetMessages();
  // }, [currentChat]);

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

  useLayoutEffect(() => {
    scrollRef?.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className="h-[70px] w-full flex flex-row px-4 py-2 justify-between border-b border-[#dbdfe2]">
        {!loadDataRoom && !isExistChatRoom && (
          <div className="flex flex-row items-center space-x-4">
            {dataRoom?.data.chatroom?.userIds.length == 2 ? (
              <div className="relative text-3xl text-[rgb(249,251,255)] h-[50px] w-[50px] flex rounded-full">
                <div className="z-10 absolute top-0 left-0">
                  {getAvatarContact(dataRoom.data.chatroom) ? (
                    <img
                      className="w-[50px] h-[50px] rounded-full object-cover"
                      src={getAvatarContact(dataRoom.data.chatroom)}
                      alt=""
                    />
                  ) : (
                    <div className="text-3xl text-white h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
                      <p>{getNameContact(dataRoom.data.chatroom)[0]}</p>
                    </div>
                  )}
                  {onlineUsers &&
                  onlineUsers[getUserIdContact(dataRoom.data.chatroom)] ? (
                    <div className="absolute z-20 top-10 left-8 bg-[#31a24c] w-[16px] h-[16px] border-[#242526] border-[3px] rounded-full"></div>
                  ) : (
                    <div className="absolute z-20 top-10 left-8 bg-[#ccc] w-[16px] h-[16px] border-[#242526] border-[3px] rounded-full"></div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <img
                  className="w-[50px] h-[50px] rounded-full object-cover "
                  src={
                    'data:image/png;base64, ' +
                    dataRoom.data.chatroom.avatar.imageBase64
                  }
                  alt=""
                />
              </div>
            )}

            <p className="text-xl text-[#777777]">
              {getNameContact(dataRoom.data.chatroom)}
            </p>
          </div>
        )}
      </div>

      <div className="chat-messages flex-1 px-3 py-4 space-y-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
        {loadDataRoom ? (
          <LoadingCompoent />
        ) : (
          <>
            {messages &&
              messages.map(message => {
                let utcDate = new Date(message.updatedAt).toUTCString();
                const time = utcDate.split(' ');
                let newtime = time[4].split(':');
                newtime[0] = (+newtime[0] + +7) % 12;

                const day = time[1] + ' ' + time[2] + ' ' + time[3];
                return (
                  <div
                    key={uuidv4()}
                    ref={scrollRef}
                    className={`message flex w-full relative items-end gap-1 ${
                      message.senderId._id === auth._id
                        ? 'flex-row-reverse'
                        : 'flex-row'
                    }`}
                    title={
                      message.senderId.firstname +
                      ' ' +
                      message.senderId.lastname
                    }
                  >
                    <div className="shadow-lg">
                      {message.senderId?.avatar ? (
                        <img
                          src={message.senderId.avatar}
                          alt=""
                          className="flex w-[20px] h-[20px] border-[1px] border-[#79C7C5] rounded-full"
                        />
                      ) : (
                        <div className="text-xl text-white h-[24px] w-[24px] flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
                          <p>{message.senderId.firstname[0]}</p>
                        </div>
                      )}
                    </div>
                    <div
                      className={`max-w-[30%] break-words flex flex-col p-1 ${
                        message.senderId._id === auth._id
                          ? 'bg-[#79c7c5] text-white'
                          : 'bg-[#97b6e2] text-white'
                      }  min-w-[50px] rounded-xl p-2`}
                    >
                      <p className="break-words text-[14px]">
                        {message.content}
                      </p>
                      <div className="text-[10px]">
                        <p className="date">{day}</p>
                        <p className="date">{newtime[0] + ':' + newtime[1]}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
      <ToastContainer />
    </>
  );
}

export default ChatContainer;
