import React, { useEffect, useState } from 'react';
import { AiOutlineMessage, AiFillMessage, AiFillSetting } from 'react-icons/ai';
import { FiBell } from 'react-icons/fi';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { AiOutlineUser } from 'react-icons/ai';
import { BiSolidBell } from 'react-icons/bi';
import { PiMagnifyingGlassFill } from 'react-icons/pi';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import ChangeInfoForm from '../ChangeInfoForm';
import LogoutForm from '../LogoutForm';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ currentUser, socket, handleSetNav, navSelect }) => {
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

  const navTopItem = [
    {
      key: 'messages',
      icon: <AiOutlineMessage size={30} />,
      selectIcon: <AiFillMessage size={30} />,
    },
    {
      key: 'search-friends',
      icon: <RxMagnifyingGlass size={30} />,
      selectIcon: <PiMagnifyingGlassFill size={30} />,
    },
    {
      key: 'notifications',
      icon: <FiBell size={30} />,
      selectIcon: <BiSolidBell size={30} />,
    },
  ];
  return (
    <div className="h-full justify-between flex flex-col bg-[#2196f3] overflow-hidden border-black shadow-sm">
      <div className="justify-start flex flex-col">
        {navTopItem.map(item => (
          <div
            onClick={() => {
              handleSetNav(item.key);
            }}
            className={`flex cursor-pointer items-center justify-center font-bold text-white p-2`}
          >
            <div
              className={`${
                navSelect === item.key ? 'bg-[#0043a6]' : ''
              } hover:bg-[#0043a6] transition-colors rounded-lg p-2`}
            >
              {navSelect === item.key ? item.selectIcon : item.icon}
            </div>
          </div>
        ))}
      </div>
      <div className="justify-end flex flex-col">
        {/* <div
          onClick={() => {}}
          className={`flex cursor-pointer items-center justify-center font-bold text-white p-2`}
        >
          <div
            className={`hover:bg-[#0043a6] transition-colors rounded-lg p-2`}
          >
            <AiOutlineUser fontSize={30} />
          </div>
        </div> */}
        <div
          onClick={() => {
            setOpenLogout(true);
          }}
          className={`flex cursor-pointer items-center justify-center font-bold text-white p-2`}
        >
          <div
            className={`hover:bg-[#0043a6] transition-colors rounded-lg p-2`}
          >
            <FiLogOut fontSize={28} />
          </div>
        </div>
      </div>
      <LogoutForm openLogout={openLogout} setOpenLogout={setOpenLogout} />
    </div>
  );
};

export default NavigationBar;
