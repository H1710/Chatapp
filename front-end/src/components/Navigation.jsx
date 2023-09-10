import React, { useEffect, useState } from 'react';
import { AiOutlineMessage, AiFillMessage, AiFillSetting } from 'react-icons/ai';
import { FiBell } from 'react-icons/fi';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { MdOutlineSettings } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { BiSolidBell } from 'react-icons/bi';
import { PiMagnifyingGlassFill } from 'react-icons/pi';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import ChangeInfoForm from './ChangeInfoForm';
import LogoutForm from './LogoutForm';

const Navigation = ({ currentUser, socket, handleSetNav, navSelect }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const [menu, setMenu] = useState(false);
  const [numberNotes, setNumberNotes] = useState(0);
  const dispatch = useDispatch();

  const [openLogout, setOpenLogout] = useState(false);

  const handleSetMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatar);
      setCurrentUserName(currentUser.fullname);
      const notification = JSON.parse(localStorage.getItem('notifications'));
      // console.log(notification);
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket?.current) {
      socket.current.on('get-friend-request', data => {
        setNumberNotes(prev => prev + 1);
      });
    }
  }, [socket?.current]);
  return (
    <div className="w-[80px] h-full justify-between flex flex-col bg-[#2196f3] overflow-hidden border-black shadow-sm">
      <div className="h-[42%] justify-start flex flex-col">
        <div
          onClick={() => {
            handleSetNav('messages');
          }}
          className={`px-[5px] cursor-pointer flex flex-1 items-center justify-center text-white ${
            navSelect === 'messages' ? 'bg-[#0043a6]' : ''
          } flex-1 hover:bg-[#0043a6]`}
        >
          {navSelect === 'messages' ? (
            <AiFillMessage size={30} />
          ) : (
            <AiOutlineMessage size={30} />
          )}
        </div>
        <div
          onClick={() => {
            handleSetNav('search-friends');
          }}
          className={`flex-1 flex cursor-pointer items-center justify-center font-bold text-white ${
            navSelect === 'search-friends' ? 'bg-[#0043a6]' : ''
          } hover:bg-[#0043a6]`}
        >
          {navSelect === 'search-friends' ? (
            <PiMagnifyingGlassFill size={35} />
          ) : (
            <RxMagnifyingGlass size={35} />
          )}
        </div>
        <div
          onClick={() => {
            handleSetNav('notifications');
            setNumberNotes(0);
          }}
          className={`flex-1 flex cursor-pointer items-center justify-center text-white ${
            navSelect === 'notifications' ? 'bg-[#0043a6]' : ''
          } hover:bg-[#0043a6]`}
        >
          {navSelect === 'notifications' ? (
            <BiSolidBell size={30} />
          ) : (
            <FiBell size={30} />
          )}
          {numberNotes !== 0 && (
            <div className="number-notes">{numberNotes}</div>
          )}
        </div>
      </div>
      <div className="h-[28%] justify-end flex flex-col">
        <div
          onClick={() => {
            handleSetNav('info');
          }}
          className={`px-[5px] cursor-pointer flex flex-1 items-center justify-center text-white ${
            navSelect === 'info' ? 'bg-[#0043a6]' : ''
          } flex-1 hover:bg-[#0043a6]`}
        >
          <AiOutlineUser fontSize={30} />
        </div>
        <div
          onClick={() => {
            setOpenLogout(true);
          }}
          className={`px-[5px] cursor-pointer flex flex-1 items-center justify-center text-white hover:bg-[#0043a6]`}
        >
          <FiLogOut fontSize={28} />
        </div>
      </div>
      <LogoutForm openLogout={openLogout} setOpenLogout={setOpenLogout} />
    </div>
  );
};

export default Navigation;
