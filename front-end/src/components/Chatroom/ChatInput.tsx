import React, { FormEvent, useState } from 'react';

interface ChatInputProps {
  handleSendMsg: (message: string) => void;
}

function ChatInput({ handleSendMsg }: ChatInputProps) {
  const [msg, setMsg] = useState('');

  const sendChat = (e: FormEvent) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <div className="h-[70px] w-full bg-white flex flex-row border-t border-[#dbdfe2]">
      <form
        className="flex flex-row items-center h-full w-full justify-between px-8"
        onSubmit={e => sendChat(e)}
      >
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          className="h-full outline-none flex justify-start placeholder:text-[#777777] text-[#777777]"
        />
        {msg && <button className="text-[#66a4ff] text-[20px]">Send</button>}
      </form>
    </div>
  );
}

export default ChatInput;
