import React, { useEffect, useState } from 'react';
import { AiOutlineMessage, AiFillMessage, AiFillSetting } from 'react-icons/ai';
import { FiBell } from 'react-icons/fi';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { MdOutlineSettings } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { BiSolidBell } from 'react-icons/bi';
import { PiMagnifyingGlassFill } from 'react-icons/pi';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import ChangeInfoForm from './ChangeInfoForm';
import LogoutForm from './LogoutForm';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ currentUser, socket, handleSetNav, navSelect }) => {
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const [numberNotes, setNumberNotes] = useState(0);
  const auth = useSelector(state => state.auth.auth);
  const navigate = useNavigate();
  const [openLogout, setOpenLogout] = useState(false);

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
            navigate(`/profile/${auth._id}`);
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
