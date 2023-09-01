import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { patchAPI } from '../utils/FetchData';
import { useMutation } from 'react-query';
import { changeInfoRoute } from '../utils/APIRoutes';
import { toast } from 'react-toastify';

const ChangeInfoForm = ({ openEditInfo, setOpenEditInfo }) => {
  const auth = useSelector(state => state.auth.auth);

  const [values, setValues] = useState({
    firstname: auth.firstname,
    lastname: auth.lastname,
    gender: auth?.gender,
    birthday: auth?.birthday,
  });
  const handleChange = e => {
    let value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
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
      return patchAPI(changeInfoRoute, info, auth.access_token);
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: data => {
      toast.success(data.data.message, toastOptions);
    },
  });

  const handleSubmit = async e => {
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
                  className="mt-4"
                  onSubmit={e => {
                    handleSubmit(e);
                  }}
                >
                  <div className="my-4 text-sm">
                    <label htmlFor="email" className="block text-black">
                      First name
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                      placeholder="First name"
                      name="firstname"
                      value={values.firstname}
                      onChange={e => handleChange(e)}
                    />
                  </div>
                  <div className="my-4 text-sm">
                    <label htmlFor="email" className="block text-black">
                      Last name
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                      placeholder="Last name"
                      name="lastname"
                      value={values.lastname}
                      onChange={e => handleChange(e)}
                    />
                  </div>
                  <div className="my-4 text-sm">
                    <label htmlFor="gender" className="block text-black mb-2">
                      Gender
                    </label>
                    <div className="flex gap-10 items-center">
                      <div className="flex gap-2">
                        <input
                          autoComplete="off"
                          type="radio"
                          name="gender"
                          value="male"
                          className="w-5 h-5"
                          id="radio-male"
                          onClick={e => handleChange(e)}
                        />
                        <label htmlFor="radio-male" className="mt-[2px]">
                          Male
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <input
                          autoComplete="off"
                          type="radio"
                          name="gender"
                          value="female"
                          className="w-5 h-5"
                          id="radio-female"
                          onClick={e => handleChange(e)}
                        />
                        <label htmlFor="radio-female" className="mt-[2px]">
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="my-4 text-sm">
                      <label htmlFor="birthday" className="block text-black">
                        Birthday
                      </label>
                      <input
                        autoComplete="off"
                        type="date"
                        className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        name="birthday"
                        onChange={e => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-20 mt-4">
                    <div
                      onClick={() => {
                        setOpenEditInfo(false);
                      }}
                      className="cursor-pointer flex-1 text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-200 w-full border border-green"
                    >
                      Cancel
                    </div>
                    <button
                      type="submit"
                      className="flex-1 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ChangeInfoForm;
