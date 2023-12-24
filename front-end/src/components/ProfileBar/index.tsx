import React, { useState } from 'react';
import Message from './Message';
import SearchUser from './SearchUser';
import Notifications from './Notifications';
import CreateGroupForm from '../Form/CreateGroupForm';

interface ProfileBarProps {
  navSelect: string;
}

function ProfileBar({ navSelect }: ProfileBarProps) {
  const [openGroupForm, setOpenGroupForm] = useState(false);

  return (
    <div
      className={`lg:w-[400px] ${
        navSelect === 'search-friends' || navSelect === 'notifications'
          ? 'w-full'
          : 'w-[75px]'
      } bg-[#FFFFFF] h-full `}
    >
      {navSelect === 'messages' && (
        <Message setOpenGroupForm={setOpenGroupForm} />
      )}
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
