import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { postAPI } from '../../apis/FetchData';
import { useMutation } from 'react-query';
import { logoutRoute } from '../../apis/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/reducers';

interface LogoutFormProps {
  openLogout: boolean;
  setOpenLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutForm: React.FC<LogoutFormProps> = ({
  openLogout,
  setOpenLogout,
}) => {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const socket = useSelector((state: RootState) => state.socket.socket);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => {
      return postAPI(logoutRoute, {}, '');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data: any) => {
      toast.success('Logout success');
      localStorage.removeItem('signed');
      socket.emit('logout', { userId: auth._id });
      navigate('/login');
    },
  });

  const handleSubmit = () => {
    mutate();
  };

  return (
    <Transition appear show={openLogout} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpenLogout(false)}
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
                  Logout
                </Dialog.Title>
                <div className="flex gap-20 mt-4">
                  <div
                    onClick={() => {
                      setOpenLogout(false);
                    }}
                    className="cursor-pointer flex-1 text-center text-black p-[12px] duration-300 rounded-sm hover:bg-slate-200 w-full border border-green"
                  >
                    Cancel
                  </div>
                  <button
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="flex-1 text-center text-white bg-[#3386ff] hover:bg-[#0068ff] p-[12px] duration-300 rounded-sm"
                  >
                    Logout
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        <ToastContainer />
      </Dialog>
    </Transition>
  );
};

export default LogoutForm;
