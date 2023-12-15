import React from 'react';
import {
  getAvatarContact,
  getNameContact,
  getUserIdContact,
} from '../../utils/ContactService';

const Header = ({ dataRoom, onlineUsers, auth }) => {
  return (
    <div className="h-[70px] w-full flex flex-row px-4 py-2 justify-between border-b border-[#dbdfe2]">
      {dataRoom?.data && (
        <div className="flex flex-row items-center space-x-4">
          {dataRoom?.data.chatroom?.userIds.length == 2 ? (
            <div className="relative text-3xl text-[rgb(249,251,255)] h-[50px] w-[50px] flex rounded-full">
              <div className="z-10 absolute top-0 left-0">
                {getAvatarContact(dataRoom.data.chatroom, auth) ? (
                  <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={getAvatarContact(dataRoom.data.chatroom, auth)}
                    alt=""
                  />
                ) : (
                  <div className="text-3xl text-white h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
                    <p>{getNameContact(dataRoom.data.chatroom, auth)[0]}</p>
                  </div>
                )}
                {onlineUsers &&
                onlineUsers[getUserIdContact(dataRoom.data.chatroom, auth)] ? (
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
                src={dataRoom?.data?.chatroom.avatar}
                alt=""
              />
            </div>
          )}

          <p className="text-xl text-[#777777]">
            {getNameContact(dataRoom?.data?.chatroom, auth)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
