import React, { useLayoutEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LoadingComponent from '../../components/Alert/LoadingComponent';

const ChatContainer = ({ loadDataRoom, messages, auth }) => {
  const scrollRef = useRef();
  useLayoutEffect(() => {
    scrollRef?.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-messages flex-1 px-3 py-4 space-y-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
      {loadDataRoom ? (
        <LoadingComponent />
      ) : (
        <>
          {messages &&
            messages.map(message => {
              let utcDate = new Date(message.updatedAt).toUTCString();
              const time = utcDate.split(' ');
              let newtime = time[4].split(':');
              newtime[0] = (+newtime[0] + +7) % 12;

              const day = time[1] + ' ' + time[2] + ' ' + time[3];
              return (
                <div
                  key={uuidv4()}
                  ref={scrollRef}
                  className={`message flex w-full relative items-end gap-1 ${
                    message.senderId._id === auth._id
                      ? 'flex-row-reverse'
                      : 'flex-row'
                  }`}
                  title={
                    message.senderId.firstname + ' ' + message.senderId.lastname
                  }
                >
                  <div className="shadow-lg">
                    {message.senderId?.avatar ? (
                      <img
                        src={message.senderId.avatar}
                        alt=""
                        className="flex w-[20px] h-[20px] border-[1px] border-[#79C7C5] rounded-full"
                      />
                    ) : (
                      <div className="text-xl text-white h-[20px] w-[20px] flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
                        <p>{message.senderId.firstname[0]}</p>
                      </div>
                    )}
                  </div>
                  <div
                    className={`max-w-[30%] break-words flex flex-col p-1 ${
                      message.senderId._id === auth._id
                        ? 'bg-[#79c7c5] text-white'
                        : 'bg-[#97b6e2] text-white'
                    }  min-w-[50px] rounded-xl p-2`}
                  >
                    <p className="break-words text-[14px]">{message.content}</p>
                    <div className="text-[10px]">
                      <p className="date">{day}</p>
                      <p className="date">{newtime[0] + ':' + newtime[1]}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default ChatContainer;
