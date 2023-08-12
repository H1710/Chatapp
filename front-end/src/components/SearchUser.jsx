import React, { useEffect, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faCircleXmark,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {
  sendRequestRoute,
  searchUserByFullnameRoute,
  getRequestSendedRoute,
  getAllUsers,
} from '../utils/APIRoutes';
import { useSelector } from 'react-redux';
import LoadingCompoent from './alert/LoadingCompoent';
import { postAPI } from '../utils/FetchData';
import useDebounce from '../hooks/useDebounce';
import { useQuery } from 'react-query';
function SearchUser({ socket }) {
  const [currentRequest, setCurrentRequest] = useState([]);
  const [search, setSearch] = useState('');

  const { auth } = useSelector(state => state);

  const keySearch = useDebounce(search, 500);

  const {
    data: dataSearch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['search', keySearch],
    queryFn: () => {
      if (keySearch) {
        return postAPI(`${searchUserByFullnameRoute}`, {
          fullname: keySearch,
        });
      }
    },
    staleTime: 3 * (60 * 1000),
    cacheTime: 5 * (60 * 1000),
  });

  useLayoutEffect(() => {
    const handleRequest = async () => {
      try {
        const res = await axios.get(`${getRequestSendedRoute}/${auth._id}`);
        setCurrentRequest(res.data.data);
      } catch (err) {}
    };
    handleRequest();
  }, []);

  const handleSendRequest = async receiverId => {
    const myId = auth._id;
    const res = await axios.post(sendRequestRoute, {
      receiverId,
      myId,
    });
    socket.current.emit('send-friend-request', {
      receiverId,
      myId,
    });
    setCurrentRequest(prev => [...prev, { receiverId: receiverId }]);
  };

  return (
    <div className="w-full">
      <div className="search-input w-full flex flex-row items-center h-10 bg-[#F9FBFF] rounded-xl overflow-hidden">
        <input
          type="tel"
          placeholder="Search..."
          onChange={e => setSearch(e.target.value)}
          value={search}
          className="w-[90%] text-[16px] bg-[#F9FBFF] h-full outline-none pl-2 flex flex-col content-center"
        />
        {search && (
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="1x"
            id="close-icon"
            onClick={() => {
              setSearch('');
            }}
          />
        )}
      </div>
      {search && (
        <div className="contacts overflow-y-scroll h-[400px] scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded mb-5">
          {isLoading ? (
            search && <LoadingCompoent />
          ) : (
            <div>
              {dataSearch?.data.data?.length !== 0 ? (
                <div>
                  {dataSearch?.data.data?.map((contact, index) => {
                    return (
                      <div
                        className="contact flex flex-row items-center px-2 py-3 cursor-pointer rounded-md border-b-[#79C7C5] border-b-[1px] hover:bg-white/20"
                        key={index}
                      >
                        <div className="avatar flex flex-row items-center space-x-2 text-lg">
                          {contact.avatar ? (
                            <img
                              src={
                                'data:image/png;base64, ' +
                                contact.avatar?.imageBase64
                              }
                              alt=""
                              className="w-[50px] h-[50px] rounded-full"
                            />
                          ) : (
                            <div className="text-[30px] text-[rgb(249,251,255)] h-[50px] w-[50px] flex items-center justify-center rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]">
                              <p>{contact?.fullname[0]}</p>
                            </div>
                          )}

                          <h3>
                            {contact?.fullname.length > 15
                              ? contact.fullname.substring(0, 15) + '...'
                              : contact.fullname}
                          </h3>
                        </div>
                        <div className="username flex flex-row flex-1 justify-end mr-2">
                          {auth.friendIdsList.includes(contact._id) ? (
                            <p>Friend</p>
                          ) : currentRequest.filter(
                              sender => sender.receiverId === contact._id
                            ).length > 0 ? (
                            <p>Sended</p>
                          ) : contact._id === auth._id ? (
                            <FontAwesomeIcon icon={faSeedling} size="1x" />
                          ) : (
                            <FontAwesomeIcon
                              onClick={() => {
                                handleSendRequest(contact._id);
                              }}
                              icon={faUserPlus}
                              size="1x"
                              className="cursor-pointer"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>User not found</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchUser;
