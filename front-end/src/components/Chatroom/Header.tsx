import React from 'react';
import {
  getAvatarContact,
  getNameContact,
  getUserIdContact,
} from '../../utils/ContactService';
import { IChatroom } from '../../models/chatroom.model';
import { User } from '../../models/user.model';

interface HeaderProps {
  chatroom: IChatroom;
  onlineUsers: string[];
  auth: User;
}

const Header: React.FC<HeaderProps> = ({ chatroom, onlineUsers, auth }) => {
  return (
    <div className="h-[70px] w-full flex flex-row px-4 py-2 justify-between border-b border-[#dbdfe2]">
      {chatroom && (
        <div className="flex flex-row items-center space-x-4">
          {!chatroom?.avatar ? (
            <div className="relative text-3xl text-[rgb(249,251,255)] h-[50px] w-[50px] flex rounded-full">
              <div className="z-10 absolute top-0 left-0">
                {getAvatarContact(chatroom, auth) ? (
                  <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={getAvatarContact(chatroom, auth)}
                    alt=""
                  />
                ) : (
                  <div className="text-3xl text-white h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
                    <p>{getNameContact(chatroom, auth)[0]}</p>
                  </div>
                )}
                {onlineUsers &&
                onlineUsers[
                  getUserIdContact(chatroom, auth) as keyof typeof onlineUsers
                ] ? (
                  <div className="absolute z-20 top-10 left-8 bg-[#31a24c] w-[16px] h-[16px] border-[#242526] border-[3px] rounded-full"></div>
                ) : (
                  <div className="absolute z-20 top-10 left-8 bg-[#ccc] w-[16px] h-[16px] border-[#242526] border-[3px] rounded-full"></div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <img
                className="w-[50px] h-[50px] rounded-full object-cover "
                src={chatroom?.avatar}
                alt=""
              />
            </div>
          )}

          <p className="text-xl text-[#777777]">
            {getNameContact(chatroom, auth)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
