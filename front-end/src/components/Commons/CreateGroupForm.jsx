import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { postAPI } from '../../utils/FetchData';
import { useMutation, useQueryClient } from 'react-query';
import { createChatroomRoute } from '../../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import ChangeAvatarGroupForm from './ChangeAvatarGroupForm';
import { CircularProgress } from '@mui/material';
import { AiOutlineCamera } from 'react-icons/ai';

const CreateGroupForm = ({ openGroupForm, setOpenGroupForm }) => {
  const auth = useSelector(state => state.auth.auth);

  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [image, setImage] = useState('');
  const queryClient = useQueryClient();

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    if (auth?.friends) {
      const friends = auth?.friends?.reduce((total, contact) => {
        return [
          ...total,
          contact.senderId._id !== auth._id
            ? contact.senderId
            : contact.receiverId,
        ];
      }, []);

      setFriends(friends);
    }
  }, [auth]);

  const filterFriends = searchtext => {
    const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
    return friends.filter(
      item => regex.test(item.firstname) || regex.test(item.lastname)
    );
  };

  const handleSearchChange = e => {
    clearTimeout(searchTimeout);
    setSearch(e.target.value);
    // debounce method
    // console.log(searchTimeout);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterFriends(e.target.value);
        setSearchResult(searchResult);
        // console.log(searchResult);
      }, 500)
    );
  };

  const [checked, setChecked] = useState([]);
  const handleChange = e => {
    const updateFriends = [...checked];
    if (e.target.checked) {
      updateFriends.push(e.target.value);
    } else {
      updateFriends.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(updateFriends);
  };

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: info => {
      return postAPI(createChatroomRoute, info, auth.access_token);
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: data => {
      setOpenGroupForm(false);
      queryClient.invalidateQueries(['refresh_token']);
      toast.success(data.data.message, toastOptions);
    },
  });

  const handleSubmit = e => {
    e.preventDefault();

    const info = new FormData();
    info.append('avatar', avatar);
    info.append('name', name);
    info.append('userIds', [...checked, auth._id]);
    mutate(info);
  };

  return (
    <Transition appear show={openGroupForm} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpenGroupForm(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-2 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create group
                </Dialog.Title>
                <form
                  action=""
                  encType="multipart/form-data"
                  onSubmit={e => {
                    handleSubmit(e);
                  }}
                >
                  <div className="text-sm flex mt-1 gap-2">
                    {image ? (
                      <div className="flex justify-center">
                        {image && (
                          <img
                            onClick={() => {
                              setOpenEditAvatar(true);
                            }}
                            src={image}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover border border-gray-300 shadow"
                          />
                        )}
                      </div>
                    ) : (
                      <div
                        className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-slate-300 hover:bg-opacity-90 cursor-pointer"
                        onClick={() => {
                          setOpenEditAvatar(true);
                        }}
                      >
                        <AiOutlineCamera size={24} />
                      </div>
                    )}
                    <input
                      autoComplete="off"
                      type="text"
                      className="rounded-sm px-4 py-3 focus:outline-none bg-gray-100 flex-1"
                      placeholder="Group name"
                      name="name"
                      value={name}
                      required
                      onChange={e => {
                        setName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="text-sm flex mt-3 gap-2">
                    <input
                      autoComplete="off"
                      type="text"
                      className="rounded-sm px-4 py-3 focus:outline-none bg-gray-100 w-full"
                      placeholder="Search..."
                      name="search"
                      value={search}
                      onChange={handleSearchChange}
                    />
                  </div>

                  <div className="flex flex-col gap-3 mt-4 h-[290px] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
                    {search
                      ? searchResult.map(contact => (
                          <div
                            className="flex items-center gap-2"
                            key={contact._id}
                          >
                            <input
                              autoComplete="off"
                              type="checkbox"
                              value={contact._id}
                              className="w-5 h-5"
                              checked={checked.includes(contact._id)}
                              onChange={handleChange}
                            />
                            <label className="flex items-center justify-start gap-2">
                              {contact?.avatar ? (
                                <img
                                  className="w-[50px] h-[50px] rounded-full border border-gray-100 object-cover "
                                  src={contact.avatar}
                                  alt="Avatar"
                                />
                              ) : (
                                <div className="text-3xl text-white h-[50px] w-[50px] flex items-center justify-center rounded-full bg-[#66a4ff]">
                                  <p>{contact.firstname[0]}</p>
                                </div>
                              )}
                              <p>
                                {contact.firstname + ' ' + contact.lastname}
                              </p>
                            </label>
                          </div>
                        ))
                      : friends &&
                        friends.map(contact => (
                          <div
                            className="flex items-center gap-2"
                            key={contact._id}
                          >
                            <input
                              autoComplete="off"
                              type="checkbox"
                              value={contact._id}
                              className="w-5 h-5"
                              checked={checked.includes(contact._id)}
                              onChange={handleChange}
                            />
                            <label className="flex items-center justify-start gap-2">
                              {contact?.avatar ? (
                                <img
                                  className="w-[50px] h-[50px] rounded-full object-cover border border-gray-100"
                                  src={contact.avatar}
                                  alt="Avatar"
                                />
                              ) : (
                                <div className="text-3xl text-white h-[50px] w-[50px] flex items-center justify-center rounded-full bg-[#66a4ff]">
                                  <p>{contact.firstname[0]}</p>
                                </div>
                              )}
                              <p>
                                {contact.firstname + ' ' + contact.lastname}
                              </p>
                            </label>
                          </div>
                        ))}
                  </div>

                  <div className="flex gap-20 mt-4">
                    <div
                      onClick={() => {
                        setOpenGroupForm(false);
                      }}
                      className="cursor-pointer flex-1 text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-200 w-full border border-green"
                    >
                      Cancel
                    </div>
                    <button
                      type="submit"
                      className={`flex-1 text-center p-3 duration-300 rounded-sm ${
                        checked.length < 2
                          ? 'bg-gray-200'
                          : 'bg-gray-800 hover:bg-black text-white'
                      }`}
                      disabled={checked.length < 2}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-1">
                          Loading...
                          <CircularProgress size={20} color="inherit" />
                        </div>
                      ) : (
                        <p>Create</p>
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        <ChangeAvatarGroupForm
          openEditAvatar={openEditAvatar}
          setOpenEditAvatar={setOpenEditAvatar}
          setAvatar={setAvatar}
          image={image}
          setImage={setImage}
        />
        <ToastContainer />
      </Dialog>
    </Transition>
  );
};

export default CreateGroupForm;
