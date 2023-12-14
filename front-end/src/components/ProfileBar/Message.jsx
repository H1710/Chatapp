import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeRoom } from '../../redux/reducers/chatroomReducer';
import { useNavigate } from 'react-router-dom';
import Search from '../Search';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import ContactList from '../ContactList';

function Message({ onlineUsers, setOpenGroupForm }) {
  // const currentRoom = useSelector(state => state.chatroom.currentRoom);

  return (
    <div className="p-2 w-full h-full flex flex-col">
      <div className="px-[10px]">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Message</p>
          <AiOutlineUsergroupAdd
            className="cursor-pointer w-[28px] h-[28px] hover:text-blue-800"
            onClick={() => {
              setOpenGroupForm(true);
            }}
          />
        </div>
        <Search field={'fullname'} />
      </div>

      <br />
      <ContactList />
    </div>
  );
}

export default Message;
