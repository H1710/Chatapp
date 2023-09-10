import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { patchAPI, postAPI } from '../utils/FetchData';
import { useMutation } from 'react-query';
import { changeInfoRoute, logoutRoute } from '../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { changeInfo } from '../redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';

const LogoutForm = ({ openLogout, setOpenLogout }) => {
  const auth = useSelector(state => state.auth.auth);
  const navigate = useNavigate();

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
      return postAPI(logoutRoute);
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: data => {
      toast.success(data.data.message, toastOptions);
      localStorage.clear('signed');
    },
  });

  const handleSubmit = () => {
    mutate();
    navigate('/login');
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
                    className="cursor-pointer flex-1 text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-200 w-full border border-green"
                  >
                    Cancel
                  </div>
                  <button
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="flex-1 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black"
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
