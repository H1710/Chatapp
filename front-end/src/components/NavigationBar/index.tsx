import React, { useState } from 'react';
import { AiOutlineMessage, AiFillMessage } from 'react-icons/ai';
import { FiBell } from 'react-icons/fi';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { BiSolidBell } from 'react-icons/bi';
import { PiMagnifyingGlassFill } from 'react-icons/pi';
import { FiLogOut } from 'react-icons/fi';
import LogoutForm from '../Form/LogoutForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import ChangeInfoForm from '../Form/ChangeInfoForm';

interface NavigationBarProps {
  handleSetNav: (key: string) => void;
  navSelect: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  handleSetNav,
  navSelect,
}) => {
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const [openLogout, setOpenLogout] = useState(false);
  const [openEditInfo, setOpenEditInfo] = useState(false);
  const auth = useSelector((state: RootState) => state.auth.auth);
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
        <div
          onClick={() => {
            setOpenEditInfo(true);
          }}
          className={`flex cursor-pointer items-center justify-center font-bold text-white p-2`}
        >
          <div
            className={`hover:bg-[#0043a6] transition-colors rounded-lg p-2`}
          >
            {auth?.avatar ? (
              <img src={auth.avatar} alt="" className="w-7 h-7 rounded-full" />
            ) : (
              <div className="text-3xl text-white h-7 w-7 flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
                <p className="text-sm">{auth.firstname[0]}</p>
              </div>
            )}
          </div>
        </div>
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
      <ChangeInfoForm
        auth={auth}
        openEditInfo={openEditInfo}
        setOpenEditInfo={setOpenEditInfo}
      />
    </div>
  );
};

export default NavigationBar;
