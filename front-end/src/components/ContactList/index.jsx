import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Contact from './Contact';
import { useNavigate } from 'react-router-dom';

const ContactList = ({ contactList }) => {
  const [currentRoom, setCurrentRoom] = useState('');
  const socket = useSelector(state => state.socket.socket);
  const onlineUsers = useSelector(state => state.user.onlineUsers);
  const navigate = useNavigate();

  const changeCurrentChat = contact => {
    if (currentRoom) {
      socket.emit('leave-room', currentRoom._id);
    }
    setCurrentRoom(contact._id);
    navigate(`/home/chatroom/${contact._id}`);
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
      {contactList.length !== 0 ? (
        contactList.map((contact, index) => (
          <Contact
            contact={contact}
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
