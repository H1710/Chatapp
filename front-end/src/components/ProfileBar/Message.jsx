import React, { useEffect, useState } from 'react';
import Search from '../Search';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import ContactList from '../ContactList';
import { useSelector } from 'react-redux';
import useDebounce from '../../hooks/useDebounce';
import { getNameContact } from '../../utils/ContactService';

function Message({ onlineUsers, setOpenGroupForm }) {
  // const currentRoom = useSelector(state => state.chatroom.currentRoom);
  const [search, setSearch] = useState('');
  const auth = useSelector(state => state.auth.auth);
  const [contactList, setContactList] = useState([]);
  const keySearch = useDebounce(search, 500);

  useEffect(() => {
    if (auth?.chatroom) {
      setContactList(auth.chatroom);
    }
  }, [auth]);

  useEffect(() => {
    if (auth?.chatroom) {
      setContactList(
        auth.chatroom.filter(element =>
          getNameContact(element, auth).includes(keySearch)
        )
      );
    }
  }, [keySearch]);

  return (
    <div className="p-2 w-full h-full flex flex-col">
      <div className="px-[10px]">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Message</p>
          <AiOutlineUsergroupAdd
            className="cursor-pointer w-[28px] h-[28px] hover:text-blue-800"
            onClick={() => {
              setOpenGroupForm(true);
            }}
          />
        </div>
        <Search field={'fullname'} setSearch={setSearch} />
      </div>

      <br />
      <ContactList contactList={contactList} />
    </div>
  );
}

export default Message;
