import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faMagnifyingGlass,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import SearchUser from './SearchUser';
import Message from './Message';
import Notifications from './Notifications';
import Logout from './Logout';
import Menu from './Menu';
import Navigation from './Navigation';
import { useSelector } from 'react-redux';

function Contacts({ onlineUsers, navSelect }) {
  const [numberNotes, setNumberNotes] = useState(0);

  const auth = useSelector(state => state.auth.auth);
  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on('get-friend-request', data => {
  //       setNumberNotes(prev => prev + 1);
  //     });
  //   }
  // }, [socket.current]);

  return (
    <div
      className={`lg:w-[440px] ${
        navSelect === 'search-friends' || navSelect === 'notifications'
          ? 'w-full'
          : 'w-[75px]'
      } lg:py-5 bg-[#FFFFFF] h-full overflow-hidden`}
    >
      <div className="">
        <div className="lg:flex hidden flex-col space-x-4 items-center gap-2 h-[30%] pb-6 border-b border-[#dbdfe2]">
          {auth?.avatar ? (
            <img
              src={'data:image/png;base64, ' + auth.avatar.imageBase64}
              alt=""
              className="w-[50px] h-[50px] shadow-lg rounded-full"
            />
          ) : (
            <div className="text-3xl text-white shadow-lg h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
              {auth?.firstname ? <p>{auth.firstname[0]}</p> : ''}
            </div>
          )}

          <p className="text-2xl text-[#33485c] font-normal truncate w-full text-center">
            {auth.firstname + ' ' + auth.lastname}
          </p>
        </div>
        {navSelect === 'messages' && <Message onlineUsers={onlineUsers} />}
        {navSelect === 'search-friends' && <SearchUser />}
        {navSelect === 'notifications' && <Notifications />}
      </div>
    </div>
  );
}

export default Contacts;
