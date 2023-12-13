import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeRoom } from '../redux/reducers/chatroomReducer';
import { useNavigate } from 'react-router-dom';

function Message({ onlineUsers }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const currentRoom = useSelector(state => state.chatroom.currentRoom);
  const [currentRoom, setCurrentRoom] = useState('');
  const socket = useSelector(state => state.socket.socket);

  const changeCurrentChat = async contact => {
    if (currentRoom) socket.emit('leave-room', currentRoom._id);
    setCurrentRoom(contact._id);
    navigate(`/home/chatroom/${contact._id}`);
  };

  const auth = useSelector(state => state.auth.auth);
  const getNameContact = contact => {
    if (contact.userIds.length === 2) {
      if (contact.userIds[0]._id === auth._id) {
        return contact.userIds[1].firstname + ' ' + contact.userIds[1].lastname;
      } else {
        return contact.userIds[0].firstname + ' ' + contact.userIds[0].lastname;
      }
    }
  };
  const getUserIdContact = contact => {
    if (contact.userIds.length === 2) {
      if (contact.userIds[0]._id === auth._id) {
        return contact.userIds[1]._id;
      } else {
        return contact.userIds[0]._id;
      }
    }
  };
  const getAvatarContact = contact => {
    if (contact.userIds.length === 2) {
      if (contact.userIds[0]._id === auth._id) {
        return contact.userIds[1]?.avatar;
      } else {
        return contact.userIds[0]?.avatar;
      }
    }
  };

  return (
    <div className="h-[400px] flex flex-col  overflow-y-scrool overflow-x-hidden scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
      {auth?.chatroom && auth?.chatroom.length !== 0 ? (
        <div className="flex flex-col justify-center">
          {auth.chatroom.map((contact, index) => {
            return (
              <div
                onClick={() => {
                  changeCurrentChat(contact);
                }}
                title={getNameContact(contact)}
                key={index}
                className={`flex justify-center transition-colors h-full lg:justify-start items-center p-3 cursor-pointer border-b border-b-[#dbdfe2] ${
                  currentRoom === contact._id && 'bg-[#dde9fd]'
                }`}
              >
                <div className="flex items-center justify-center lg:mr-6 relative h-full">
                  {contact.userIds.length == 2 ? (
                    <div className="relative text-3xl text-[rgb(249,251,255)] h-[50px] w-[50px] flex rounded-full">
                      <div className="z-10 absolute top-0 left-0">
                        {getAvatarContact(contact) ? (
                          <img
                            className="w-[50px] h-[50px] rounded-full object-cover shadow-lg"
                            src={getAvatarContact(contact)}
                            alt="Avatar"
                          />
                        ) : (
                          <div className="text-3xl text-white h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
                            <p>{getNameContact(contact)[0]}</p>
                          </div>
                        )}
                        {onlineUsers &&
                        onlineUsers[getUserIdContact(contact)] ? (
                          <div className="absolute z-20 top-10 left-8 bg-[#31a24c] w-[16px] h-[16px] border-[#242526] border-[3px] rounded-full"></div>
                        ) : (
                          <div className="absolute z-20 top-10 left-8 bg-[#ccc] w-[16px] h-[16px] border-[#242526] border-[3px] rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <img
                        className="w-[50px] h-[50px] rounded-full m-auto object-cover "
                        src={contact.avatar}
                        alt=""
                      />
                    </div>
                  )}
                </div>
                <h3 className="text-[#777777] mb-1 hidden lg:block">
                  {contact?.name ? contact.name : getNameContact(contact)}
                </h3>
                {/* <p className="text-[#79C7C5]">Last message</p> */}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-2 ml-2">
          Have not contact. Please search to add friend
        </p>
      )}
    </div>
  );
}

export default Message;
