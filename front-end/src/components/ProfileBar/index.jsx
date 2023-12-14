import React, { useState } from 'react';
import SearchUser from './SearchUser';
import Message from './Message';
import Notifications from '../Notifications';
import { useSelector } from 'react-redux';
import CreateGroupForm from '../CreateGroupForm';

function ProfileBar({ navSelect }) {
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

  return (
    <div
      className={`lg:w-[400px] ${
        navSelect === 'search-friends' || navSelect === 'notifications'
          ? 'w-full'
          : 'w-[75px]'
      } bg-[#FFFFFF] h-full `}
    >
      {navSelect === 'messages' && <Message onlineUsers={onlineUsers} />}
      {navSelect === 'search-friends' && <SearchUser />}
      {navSelect === 'notifications' && <Notifications />}
      <CreateGroupForm
        openGroupForm={openGroupForm}
        setOpenGroupForm={setOpenGroupForm}
      />
    </div>
  );
}

export default ProfileBar;
