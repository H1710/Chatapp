import React from 'react';
import {
  getAvatarContact,
  getNameContact,
  getUserIdContact,
} from '../../utils/ContactService';
import UserInfomation from '../User/UserInfomation';

const Contact = ({
  contact,
  auth,
  currentRoom,
  onlineUsers,
  changeCurrentChat,
}) => {
  return (
    <div
      onClick={() => changeCurrentChat(contact)}
      title={getNameContact(contact, auth)}
      className={`flex p-[10px] justify-center transition-colors lg:justify-start items-center rounded ${
        currentRoom === contact._id
          ? 'bg-[#dde9fd]'
          : 'hover:bg-slate-100 cursor-pointer'
      }`}
    >
      <UserInfomation contact={contact} auth={auth} onlineUsers={onlineUsers} />
    </div>
  );
};

export default Contact;
