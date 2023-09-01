import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { patchAPI } from '../utils/FetchData';
import { useMutation } from 'react-query';
import { changeInfoRoute } from '../utils/APIRoutes';
import { toast } from 'react-toastify';

const ChangeAvatarForm = ({ openEditAvatar, setOpenEditAvatar }) => {
  const handleSubmit = () => {};
  const [selectedFile, setSelectedFile] = useState('');
  const [image, setImage] = useState('');

  const handleChange = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <Transition appear show={openEditAvatar} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpenEditAvatar(false)}
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
                  Edit avatar
                </Dialog.Title>

                <form
                  className="mt-4"
                  onSubmit={e => {
                    handleSubmit(e);
                  }}
                >
                  <div className="my-4 text-sm">
                    <label htmlFor="avatar" className="block text-black">
                      Avatar
                    </label>
                    <input
                      autoComplete="off"
                      type="file"
                      className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                      placeholder="Avatar"
                      name="avatar"
                      accept=".jpg, .jpeg, .png"
                      //   value={values.firstname}
                      onChange={e => handleChange(e)}
                    />
                  </div>
                  <div className="flex justify-center">
                    <img
                      onClick={() => {}}
                      src={image}
                      alt=""
                      className="w-44 h-44 rounded-full object-cover"
                    />
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

export default ChangeAvatarForm;
