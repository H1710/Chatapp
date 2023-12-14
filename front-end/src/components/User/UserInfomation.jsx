import React from 'react';
import {
  getAvatarContact,
  getNameContact,
  getUserIdContact,
} from '../../utils/ContactService';

const UserInfomation = ({ contact, auth, onlineUsers }) => {
  console.log(contact);
  return (
    <>
      <div className="flex items-center justify-center lg:mr-6 relative">
        {contact.userIds?.length == 2 ? (
          <div className="relative h-12 w-12 flex rounded-full">
            {getAvatarContact(contact, auth) ? (
              <img
                className="w-full h-full rounded-full object-cover shadow-lg"
                src={getAvatarContact(contact, auth)}
                alt="Avatar"
              />
            ) : (
              <div className="text-3xl text-white h-[48px] w-[48px] flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
                <p>{getNameContact(contact, auth)[0]}</p>
              </div>
            )}
            {onlineUsers && onlineUsers[getUserIdContact(contact, auth)] ? (
              <div className="absolute z-20 top-10 left-8 bg-[#31a24c] w-[12px] h-[12px] border-[#242526] border-[2px] rounded-full"></div>
            ) : (
              <div className="absolute z-20 top-10 left-8 bg-[#ccc] w-[12px] h-[12px] border-[#242526] border-[2px] rounded-full"></div>
            )}
          </div>
        ) : (
          <div>
            <img
              className="w-[48px] h-[48px] rounded-full m-auto object-cover "
              src={contact.avatar}
              alt=""
            />
          </div>
        )}
      </div>
      <span className="text-[#777777] text-[15px] font-medium hidden lg:block">
        {contact?.name ? contact.name : getNameContact(contact, auth)}
      </span>
    </>
  );
};

export default UserInfomation;
