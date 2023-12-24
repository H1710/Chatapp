import React, { useEffect, useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import Search from '../Search';
import ContactList from '../ContactList';
import { useSelector } from 'react-redux';
import useDebounce from '../../hooks/useDebounce';
import { getNameContact } from '../../utils/ContactService';
import { RootState } from '../../redux/reducers';
import { IChatroom } from '../../models/chatroom.model';

interface MessageProps {
  setOpenGroupForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function Message({ setOpenGroupForm }: MessageProps) {
  const [search, setSearch] = useState<string>('');
  const auth = useSelector((state: RootState) => state.auth.auth);
  const [chatroomList, setChatroomList] = useState<IChatroom[]>([]);
  const keySearch = useDebounce(search, 500);

  useEffect(() => {
    if (auth?.chatroom) {
      setChatroomList(auth.chatroom);
    }
  }, [auth]);

  useEffect(() => {
    if (auth?.chatroom) {
      setChatroomList(
        auth.chatroom.filter((element: IChatroom) =>
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
        <Search field={'fullname'} setSearch={setSearch} search={search} />
      </div>

      <br />
      <ContactList chatroomList={chatroomList} />
    </div>
  );
}

export default Message;
