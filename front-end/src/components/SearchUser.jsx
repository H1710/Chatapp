import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import {
  sendRequestRoute,
  searchUserByFullnameRoute,
  cancelRequestRoute,
  acceptRequestRoute,
  recallRequestRoute,
} from '../utils/APIRoutes';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import LoadingCompoent from './alert/LoadingCompoent';
import { getAPI, postAPI } from '../utils/FetchData';
import useDebounce from '../hooks/useDebounce';
import { useMutation, useQuery } from 'react-query';
function SearchUser() {
  const [search, setSearch] = useState('');

  const auth = useSelector(state => state.auth.auth);

  const keySearch = useDebounce(search, 500);

  const {
    data: dataSearch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['search', keySearch],
    queryFn: () => {
      if (keySearch) {
        return getAPI(`${searchUserByFullnameRoute}/${auth._id}/${keySearch}`);
      }
    },
    staleTime: 10 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const { mutate: sendRequest, isLoading: loadingSendRequest } = useMutation({
    mutationFn: info => {
      return postAPI(sendRequestRoute, info);
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: data => {
      toast.success(data.data.message, toastOptions);
    },
  });

  const handleSendRequest = async receiver => {
    try {
      await sendRequest({
        myId: auth._id,
        receiverId: receiver._id,
      });

      receiver.friends.push({
        senderId: auth._id,
        receiverId: receiver._id,
        status: 2,
      });
    } catch (err) {}

    // const myId = auth._id;
    // const res = await axios.post(sendRequestRoute, {
    //   receiverId,
    //   myId,
    // });
    // socket.current.emit('send-friend-request', {
    //   receiverId,
    //   myId,
    // });
    // setCurrentRequest(prev => [...prev, { receiverId: receiverId }]);
  };

  const { mutate: cancelRequest, isLoading: loadingCancelRequest } =
    useMutation({
      mutationFn: info => {
        return postAPI(cancelRequestRoute, info);
      },
      onError: error => {
        toast.error(error.response.data.message, toastOptions);
      },
      onSuccess: data => {
        toast.success(data.data.message, toastOptions);
      },
    });

  const handleCancelRequest = async sender => {
    try {
      await cancelRequest({
        myId: auth._id,
        senderId: sender._id,
      });

      sender.friends = [];
    } catch (err) {}
  };

  const { mutate: acceptRequest, isLoading: loadingAcceptRequest } =
    useMutation({
      mutationFn: info => {
        return postAPI(acceptRequestRoute, info);
      },
      onError: error => {
        toast.error(error.response.data.message, toastOptions);
      },
      onSuccess: data => {
        toast.success(data.data.message, toastOptions);
      },
    });

  const handleAcceptRequest = async sender => {
    try {
      await acceptRequest({
        myId: auth._id,
        senderId: sender._id,
      });

      sender.friends[0].status = 3;
    } catch (err) {}
  };

  const { mutate: recallRequest, isLoading: loadingrecallRequest } =
    useMutation({
      mutationFn: info => {
        return postAPI(recallRequestRoute, info);
      },
      onError: error => {
        toast.error(error.response.data.message, toastOptions);
      },
      onSuccess: data => {
        toast.success(data.data.message, toastOptions);
      },
    });

  const handleRecallRequest = async receiver => {
    try {
      await recallRequest({
        myId: auth._id,
        receiverId: receiver._id,
      });

      receiver.friends[0].status = 0;
    } catch (err) {}
  };

  return (
    <div className="w-full px-2">
      <div className="flex flex-row items-center h-10 overflow-hidden bg-[#dbdfe2] pr-2 mt-2">
        <input
          placeholder="Search by fullname"
          onChange={e => setSearch(e.target.value)}
          value={search}
          className="flex-1 text-[16px] bg-[#dbdfe2] h-full  pl-2 flex flex-col content-center outline-none"
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
              {dataSearch?.data.users?.length !== 0 ? (
                <div>
                  {dataSearch?.data.users?.map((contact, index) => {
                    return (
                      <div
                        className="flex flex-row items-center px-2 py-3 cursor-pointer border-b-[1px] hover:bg-white/20 gap-2"
                        key={index}
                      >
                        <div className="flex flex-row items-center gap-2 truncate">
                          {contact?.avatar ? (
                            <img
                              src={contact.avatar}
                              alt=""
                              className="w-[50px] h-[50px] rounded-full border border-gray-200"
                            />
                          ) : (
                            <div className="text-3xl text-white h-[50px] w-[50px] flex items-center justify-center m-auto rounded-full bg-[#66a4ff]">
                              <p>{contact?.firstname[0]}</p>
                            </div>
                          )}

                          <p className=" text-lg text-[#33485c] flex-1 font-normal truncate text-center">
                            {contact?.firstname + ' ' + contact?.lastname}
                          </p>
                        </div>
                        <div className="flex flex-row flex-1 justify-end">
                          {contact._id === auth._id ? (
                            <button className="w-36 h-10 text-center"></button>
                          ) : contact.friends.length === 0 ||
                            contact.friends[0].status === 0 ? (
                            <button
                              onClick={() => {
                                handleSendRequest(contact);
                              }}
                              className="w-32 h-10 bg-[#e5efff] hover:bg-[#c7e0ff] text-center text-[#005ae0]"
                            >
                              Addfriend
                            </button>
                          ) : contact.friends[0].status === 3 ? (
                            <div>Friend</div>
                          ) : contact.friends[0].senderId === auth._id ? (
                            <button
                              onClick={() => {
                                handleRecallRequest(contact);
                              }}
                              className="w-36 h-10 bg-[#eaedf0] hover:bg-[#dfe2e7] text-center"
                            >
                              Cancel request
                            </button>
                          ) : (
                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  handleAcceptRequest(contact);
                                }}
                                className="w-20 h-10 bg-[#e5efff] hover:bg-[#c7e0ff] text-center text-[#005ae0]"
                              >
                                Agree
                              </button>
                              <button
                                onClick={() => {
                                  handleCancelRequest(contact);
                                }}
                                className="w-20 h-10 bg-[#eaedf0] hover:bg-[#dfe2e7] text-center"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-2 ml-2">User not found</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchUser;
