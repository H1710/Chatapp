import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { postAPI } from '../../apis/FetchData';
import { useMutation, useQueryClient } from 'react-query';
import { createChatroomRoute } from '../../apis/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import ImageForm from './ImageForm';
import { CircularProgress } from '@mui/material';
import { AiOutlineCamera } from 'react-icons/ai';
import { CreateChatroom } from '../../models/chatroom.model';
import useDebounce from '../../hooks/useDebounce';
import { RootState } from '../../redux/reducers';
import CustomButton from '../Button/CustomButton';
import { UserDto } from '../../models/user.model';

interface CreateGroupFormProps {
  openGroupForm: boolean;
  setOpenGroupForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
  openGroupForm,
  setOpenGroupForm,
}) => {
  const auth = useSelector((state: RootState) => state.auth.auth);

  const [values, setValues] = useState<CreateChatroom>({
    name: '',
    avatar: undefined,
    userIds: [],
  });
  const [search, setSearch] = useState('');
  const keySearch = useDebounce(search, 500);
  const [searchResult, setSearchResult] = useState<UserDto[]>([]);
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const queryClient = useQueryClient();
  const [friends, setFriends] = useState<UserDto[]>([]);

  useEffect(() => {
    if (auth?.friends) {
      const friendsList: UserDto[] = auth.friends.reduce(
        (total: UserDto[], contact: any) => {
          let friend: UserDto | null = null;

          if (contact.status === 3) {
            friend =
              contact.senderId._id !== auth._id
                ? contact.senderId
                : contact.receiverId;
          }

          if (friend) {
            total.push(friend);
          }

          return total;
        },
        []
      );

      setFriends(friendsList);
    }
  }, [auth]);

  const filterFriends = (searchtext: string) => {
    return friends.filter(
      (item: UserDto) =>
        item.firstname.includes(searchtext) ||
        item.lastname.includes(searchtext)
    );
  };

  useEffect(() => {
    const searchResult = filterFriends(keySearch);
    setSearchResult(searchResult);
  }, [keySearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => {
      if (e.target.name === 'users') {
        console.log(e.target.value);

        const updateFriends = [...prev.userIds];

        if (e.target.checked) {
          updateFriends.push(e.target.value);
        } else {
          const index = updateFriends.indexOf(e.target.value);
          if (index !== -1) {
            updateFriends.splice(index, 1);
          }
        }
        return { ...prev, userIds: updateFriends };
      } else {
        return { ...prev, [e.target.name]: e.target.value };
      }
    });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (info: CreateChatroom) => {
      const formData = new FormData();
      formData.append('avatar', info.avatar || '');
      formData.append('name', info.name);
      formData.append('userIds', JSON.stringify(info.userIds));

      return postAPI(createChatroomRoute, formData, auth.access_token || '');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data: any) => {
      setOpenGroupForm(false);
      queryClient.invalidateQueries(['refresh_token']);
      toast.success(data.data.message);
    },
  });
  const handleSetImage = (image: File) => {
    setValues(prev => {
      prev.avatar = image;
      return prev;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const info: CreateChatroom = {
      avatar: values.avatar,
      name: values.name,
      userIds: [...values.userIds, auth._id],
    };
    if (values?.avatar) {
      mutate(info);
    } else {
      toast.error('Avatar is required');
    }
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
                        <img
                          onClick={() => {
                            setOpenEditAvatar(true);
                          }}
                          src={image}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full object-cover border border-gray-300 shadow"
                        />
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
                      className="rounded-sm px-4 py-3 focus:outline-none border border-green-50 flex-1"
                      placeholder="Group name"
                      name="name"
                      value={values.name}
                      required
                      onChange={e => handleChange(e)}
                    />
                  </div>

                  <div className="text-sm flex mt-3 gap-2">
                    <input
                      autoComplete="off"
                      type="text"
                      className="rounded-sm px-4 py-3 focus:outline-none border border-green-50 w-full"
                      placeholder="Search..."
                      name="search"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-3 mt-4 h-[290px] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
                    {search
                      ? searchResult.map((contact: any) => (
                          <div
                            className="flex items-center gap-2"
                            key={contact._id}
                          >
                            <input
                              autoComplete="off"
                              type="checkbox"
                              value={contact._id}
                              name="users"
                              className="w-5 h-5"
                              checked={values.userIds.includes(contact._id)}
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
                              name="users"
                              checked={values.userIds.includes(contact._id)}
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
                    <CustomButton
                      type="button"
                      handleSubmit={() => {
                        setOpenGroupForm(false);
                      }}
                      text="Cancel"
                      isLoading={false}
                      classContent="cursor-pointer flex-1 text-center text-black p-[12px] duration-300 rounded-sm hover:bg-slate-200 w-full border border-green"
                    />
                    <button
                      type="submit"
                      className={`flex-1 text-center p-[12px] duration-300 rounded-sm ${
                        values.userIds.length < 2 || !image || !values.name
                          ? 'bg-gray-200'
                          : 'bg-[#3386ff] hover:bg-[#0068ff] text-white'
                      }`}
                      disabled={
                        values.userIds.length < 2 ||
                        !image ||
                        !values.name ||
                        isLoading
                      }
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
        <ImageForm
          openEditAvatar={openEditAvatar}
          setOpenEditAvatar={setOpenEditAvatar}
          handleSetImage={handleSetImage}
          image={image}
          setImage={setImage}
        />
        <ToastContainer />
      </Dialog>
    </Transition>
  );
};

export default CreateGroupForm;
