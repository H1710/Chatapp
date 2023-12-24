import React from 'react';
import {
  getAvatarContact,
  getNameContact,
  getUserIdContact,
} from '../../utils/ContactService';
import UserInfomation from '../User/UserInfomation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { IChatroom } from '../../models/chatroom.model';

interface ContactProps {
  chatroom: IChatroom;
  currentRoom: string;
  onlineUsers: string[];
  changeCurrentChat: (contact: any) => void;
}

const Contact: React.FC<ContactProps> = ({
  chatroom,
  currentRoom,
  onlineUsers,
  changeCurrentChat,
}) => {
  const auth = useSelector((state: RootState) => state.auth.auth);

  return (
    <div
      onClick={() => changeCurrentChat(chatroom)}
      title={getNameContact(chatroom, auth)}
      className={`flex p-[10px] justify-center transition-colors lg:justify-start items-center rounded ${
        currentRoom === chatroom._id
          ? 'bg-[#dde9fd]'
          : 'hover:bg-slate-100 cursor-pointer'
      }`}
    >
      <UserInfomation
        chatroom={chatroom}
        auth={auth}
        onlineUsers={onlineUsers}
      />
    </div>
  );
};

export default Contact;
