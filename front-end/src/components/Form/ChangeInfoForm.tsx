import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { patchAPI } from '../../apis/FetchData';
import { useMutation, useQueryClient } from 'react-query';
import { avatarRoute, changeInfoRoute } from '../../apis/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { changeInfo } from '../../redux/reducers/authReducer';
import { User, UserUpdate } from '../../models/user.model';
import CustomButton from '../Button/CustomButton';
import { AiOutlineCamera } from 'react-icons/ai';
import ImageForm from './ImageForm';
import { CircularProgress } from '@mui/material';

interface ChangeInfoFormProps {
  auth: User;
  openEditInfo: boolean;
  setOpenEditInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeInfoForm: React.FC<ChangeInfoFormProps> = ({
  auth,
  openEditInfo,
  setOpenEditInfo,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [values, setValues] = useState<UserUpdate>({
    _id: auth._id,
    firstname: auth.firstname,
    lastname: auth.lastname,
    gender: auth?.gender,
    birthday: auth?.birthday ? auth.birthday.slice(0, 10) : undefined,
  });
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    setValues(prev => {
      prev._id = auth._id;
      prev.firstname = auth.firstname;
      prev.lastname = auth.lastname;
      prev.gender = auth?.gender;
      prev.birthday = auth?.birthday ? auth.birthday.slice(0, 10) : undefined;

      return prev;
    });
  }, [auth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (info: any) => {
      return patchAPI(changeInfoRoute, info, auth?.access_token || '');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: (data: any) => {
      toast.success(data.message);
      dispatch(changeInfo(data.info));
    },
  });

  const { mutate: setAvatar, isLoading: loadingChangeAvatar } = useMutation({
    mutationFn: (info: FormData) => {
      return patchAPI(avatarRoute, info, auth?.access_token || '');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: data => {
      setOpenEditAvatar(false);
      queryClient.invalidateQueries(['refresh_token']);
      toast.success(data.message);
    },
  });
  const handleSetImage = (image: File) => {
    const avatar = new FormData();
    avatar.append('avatar', image);
    setAvatar(avatar);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <Transition appear show={openEditInfo} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpenEditInfo(false)}
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                  Edit infomations
                </Dialog.Title>

                <form
                  className="mt-4 flex flex-col gap-2"
                  onSubmit={e => {
                    handleSubmit(e);
                  }}
                >
                  <div className="text-sm flex justify-between gap-4">
                    <div className="w-[50px] h-[50px] flex items-center justify-center">
                      {loadingChangeAvatar ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        <>
                          {auth.avatar ? (
                            <div className="flex justify-center">
                              <img
                                onClick={() => {
                                  setOpenEditAvatar(true);
                                }}
                                src={auth.avatar}
                                alt=""
                                className="w-full h-full rounded-full object-cover border border-gray-300 shadow"
                              />
                            </div>
                          ) : (
                            <div
                              className="w-full h-full rounded-full flex justify-center items-center bg-slate-300 hover:bg-opacity-90 cursor-pointer"
                              onClick={() => {
                                setOpenEditAvatar(true);
                              }}
                            >
                              <AiOutlineCamera size={24} />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <CustomButton
                      handleSubmit={() => setOpenEditAvatar(true)}
                      text="Set avatar"
                      classContent="cursor-pointer text-center text-black duration-300 rounded-sm hover:bg-slate-200 flex-1 border border-green"
                      type="button"
                      isLoading={false}
                    />
                  </div>
                  <div className="text-sm">
                    <label htmlFor="email" className="block text-black">
                      First name
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="rounded-sm px-4 py-3 mt-1 focus:outline-none border border-green-50 w-full"
                      placeholder="First name"
                      name="firstname"
                      value={values.firstname}
                      onChange={e => handleChange(e)}
                    />
                  </div>
                  <div className="text-sm">
                    <label htmlFor="email" className="block text-black">
                      Last name
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="rounded-sm px-4 py-3 mt-1 focus:outline-none border border-green-50 w-full"
                      placeholder="Last name"
                      name="lastname"
                      value={values.lastname}
                      onChange={e => handleChange(e)}
                    />
                  </div>
                  <div className=" text-sm">
                    <label htmlFor="gender" className="block text-black">
                      Gender
                    </label>
                    <div className="flex gap-10 items-center mt-1">
                      <div className="flex gap-2 items-center">
                        <input
                          autoComplete="off"
                          type="radio"
                          name="gender"
                          value="male"
                          checked={values?.gender === 'male' ? true : false}
                          className="w-5 h-5"
                          id="radio-male"
                          onChange={e => handleChange(e)}
                        />
                        <label htmlFor="radio-male" className="mt-[2px]">
                          Male
                        </label>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          autoComplete="off"
                          type="radio"
                          name="gender"
                          value="female"
                          checked={values?.gender === 'female' ? true : false}
                          className="w-5 h-5"
                          id="radio-female"
                          onChange={e => handleChange(e)}
                        />
                        <label htmlFor="radio-female" className="mt-[2px]">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" text-sm">
                    <label htmlFor="birthday" className="block text-black">
                      Birthday
                    </label>
                    <input
                      autoComplete="off"
                      type="date"
                      className="rounded-sm px-4 py-3 mt-1 focus:outline-none border border-green-50 w-full"
                      name="birthday"
                      value={values?.birthday}
                      onChange={e => handleChange(e)}
                    />
                  </div>
                  <div className="flex gap-20 mt-4">
                    <CustomButton
                      handleSubmit={() => setOpenEditInfo(false)}
                      text="Cancel"
                      classContent="cursor-pointer flex-1 text-center text-black p-[12px] duration-300 rounded-sm hover:bg-slate-200 w-full border border-green"
                      type="button"
                      isLoading={false}
                    />
                    <CustomButton
                      handleSubmit={() => {}}
                      text="Update"
                      classContent="flex-1 text-center text-white bg-[#3386ff] hover:bg-[#0068ff] py-[12px] duration-300 rounded-sm"
                      type="submit"
                      isLoading={isLoading}
                    />
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

export default ChangeInfoForm;
