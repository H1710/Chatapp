import React, { useState } from 'react';
import SearchUser from './SearchUser';
import Message from './Message';
import Notifications from './Notifications';
import { useSelector } from 'react-redux';
import { HiOutlineUserGroup } from 'react-icons/hi';
import CreateGroupForm from './CreateGroupForm';

function Contacts({ navSelect }) {
  const [numberNotes, setNumberNotes] = useState(0);

  const auth = useSelector(state => state.auth.auth);
  const [openGroupForm, setOpenGroupForm] = useState(false);
  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on('get-friend-request', data => {
  //       setNumberNotes(prev => prev + 1);
  //     });
  //   }
  // }, [socket.current]);

  const onlineUsers = useSelector(state => state.user.onlineUsers);
  console.log(onlineUsers);

  return (
    <div
      className={`lg:w-[440px] ${
        navSelect === 'search-friends' || navSelect === 'notifications'
          ? 'w-full'
          : 'w-[75px]'
      } lg:py-5 bg-[#FFFFFF] h-full overflow-hidden`}
    >
      <div className="">
        <div className="relative lg:flex hidden flex-col space-x-4 items-center gap-2 h-[30%] pb-6 border-b border-[#dbdfe2]">
          {auth?.avatar ? (
            <img
              src={auth.avatar}
              alt=""
              className="w-[50px] h-[50px] shadow-lg rounded-full object-cover"
            />
          ) : (
            <div className="text-3xl text-white shadow-lg h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
              {auth?.firstname ? <p>{auth.firstname[0]}</p> : ''}
            </div>
          )}

          <p className="text-2xl text-[#33485c] font-normal truncate w-full text-center">
            {auth.firstname + ' ' + auth.lastname}
          </p>
          <HiOutlineUserGroup
            size={32}
            className="absolute top-0 right-3 cursor-pointer w-8 h-8 hover:text-blue-800"
            onClick={() => {
              setOpenGroupForm(true);
            }}
          />
        </div>
        {navSelect === 'messages' && <Message onlineUsers={onlineUsers} />}
        {navSelect === 'search-friends' && <SearchUser />}
        {navSelect === 'notifications' && <Notifications />}
      </div>
      <CreateGroupForm
        openGroupForm={openGroupForm}
        setOpenGroupForm={setOpenGroupForm}
      />
    </div>
  );
}

export default Contacts;
