import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Contact from './Contact';
import { useNavigate, useParams } from 'react-router-dom';
import { IChatroom } from '../../models/chatroom.model';
import { RootState } from '../../redux/reducers';

interface ContactListProps {
  chatroomList: IChatroom[];
}

const ContactList: React.FC<ContactListProps> = ({ chatroomList }) => {
  const [currentRoom, setCurrentRoom] = useState<string>('');
  const socket = useSelector((state: RootState) => state.socket.socket);
  const onlineUsers = useSelector((state: RootState) => state.user.onlineUsers);
  const navigate = useNavigate();

  const changeCurrentChat = (chatroom: IChatroom) => {
    if (currentRoom) {
      socket.emit('leave-room', currentRoom);
    }
    setCurrentRoom(chatroom._id);
    navigate(`/home/chatroom/${chatroom._id}`);
  };

  const { currentRoomId } = useParams();
  useEffect(() => {
    if (currentRoomId) {
      setCurrentRoom(currentRoomId);
    }
  }, [currentRoomId]);

  return (
    <div className="h-full flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
      {chatroomList.length !== 0 ? (
        chatroomList.map((chatroom: IChatroom, index: number) => (
          <Contact
            chatroom={chatroom}
            key={index}
            currentRoom={currentRoom}
            onlineUsers={onlineUsers}
            changeCurrentChat={changeCurrentChat}
          />
        ))
      ) : (
        <p className="mt-2 ml-2">
          Have not contacted anyone. Please search to add friends.
        </p>
      )}
    </div>
  );
};

export default ContactList;
