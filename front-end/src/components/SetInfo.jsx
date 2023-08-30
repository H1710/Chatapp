import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiEditAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { changeInfoRoute } from '../utils/APIRoutes';
import { patchAPI } from '../utils/FetchData';
import { toast } from 'react-toastify';
import Loading from './alert/Loading';
import { SlOptions } from 'react-icons/sl';

const SetInfo = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.auth);
  console.log(auth);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    fullname: auth.fullname,
    username: auth.username,
  });

  const [edit, setEdit] = useState({
    fullname: true,
    username: true,
    password: true,
  });

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const handleChange = e => {
    let value = e.target.files ? e.target.files : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
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
      dispatch({
        type: 'AUTH',
        payload: {
          ...auth,
          fullname: values.fullname,
          username: values.username,
        },
      });
      Object.keys(edit).forEach(v => (edit[v] = true));
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="h-full flex-1 bg-white bg-opacity-80 overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
        {/* Header */}
        <div className="border-b-2 border-[#dbdfe2] px-40 shadow-sm">
          <div className=" w-full flex items-center gap-2 mt-6 pb-3 px-10 justify-between border-b border-[#dbdfe2]">
            <div className="flex flex-row gap-10 justify-center items-center">
              {auth.avatar ? (
                <img
                  src={'data:image/png;base64, ' + auth.avatar?.imageBase64}
                  alt={auth.firstname + ' ' + auth.lastname}
                  className="w-20 h-20 rounded-full shadow-lg"
                  title={auth.firstname + ' ' + auth.lastname}
                />
              ) : (
                <div
                  className="text-[50px] text-[rgb(249,251,255)] h-44 w-44 flex items-center justify-center rounded-full bg-[#66a4ff]"
                  title={auth.firstname + ' ' + auth.lastname}
                >
                  <p>{auth.firstname[0]}</p>
                </div>
              )}

              <div className=" text-3xl font-bold text-black truncate">
                {auth.firstname + ' ' + auth.lastname}
              </div>
            </div>
            <div className="flex w-full lg:w-fit justify-end">
              <button
                className="rounded hover:bg-opacity-95 bg-[#63a09e] text-white font-medium py-2 px-2 flex items-center gap-1"
                onClick={() => navigate('/setAvatar')}
              >
                <BiEditAlt fontSize={26} />
                <span>Edit avartar</span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between pr-2">
            <div className="flex gap-4 h-16 items-center">
              <a
                onClick={() => {
                  // handleAcceptRequest(contact);
                }}
                className="px-3 py-3 hover:bg-[#e6e7e8] rounded-sm text-center text-black cursor-pointer hover:text-black"
              >
                Post
              </a>
              <a
                onClick={() => {
                  // handleAcceptRequest(contact);
                }}
                className="px-3 py-3 hover:bg-[#e6e7e8] rounded-sm text-center text-black cursor-pointer hover:text-black"
              >
                Introduction
              </a>
              <a
                onClick={() => {
                  // handleAcceptRequest(contact);
                }}
                className="px-3 py-3 hover:bg-[#e6e7e8] rounded-sm text-center text-black cursor-pointer hover:text-black"
              >
                Friends
              </a>
              <a
                onClick={() => {
                  // handleAcceptRequest(contact);
                }}
                className="px-3 py-3 hover:bg-[#e6e7e8] rounded-sm text-center text-black cursor-pointer hover:text-black"
              >
                Images
              </a>
            </div>
            <div className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-center text-black cursor-pointer hover:text-black">
              <SlOptions size={24} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-52 flex gap-4 bg-[#f0f2f5] pt-3">
          <div className="flex flex-col gap-4">
            {/* Images */}
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex justify-between mb-3 items-center">
                <p className="text-2xl font-semibold">Images</p>
                <a className="text-blue-400 cursor-pointer">See more</a>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <img
                  src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.0e3166482a69f6e0f869a048cf5c06bb695e2577.svg"
                  alt=""
                  className="w-24 h-24 border border-blue-300 rounded-md hover:opacity-60 cursor-pointer object-fill"
                />
                <img
                  src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.0e3166482a69f6e0f869a048cf5c06bb695e2577.svg"
                  alt=""
                  className="w-24 h-24 border border-blue-300 rounded-md hover:opacity-60 cursor-pointer object-fill"
                />
                <img
                  src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.0e3166482a69f6e0f869a048cf5c06bb695e2577.svg"
                  alt=""
                  className="w-24 h-24 border border-blue-300 rounded-md hover:opacity-60 cursor-pointer object-fill"
                />
                <img
                  src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.0e3166482a69f6e0f869a048cf5c06bb695e2577.svg"
                  alt=""
                  className="w-24 h-24 border border-blue-300 rounded-md hover:opacity-60 cursor-pointer object-fill"
                />
              </div>
            </div>
            {/* Friends */}
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex justify-between mb-3 items-center">
                <p className="text-2xl font-semibold">Friends</p>
                <a className="text-blue-400 cursor-pointer">See more</a>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <img
                  src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.0e3166482a69f6e0f869a048cf5c06bb695e2577.svg"
                  alt=""
                  className="w-24 h-24 border border-blue-300 rounded-md hover:opacity-60 cursor-pointer object-fill"
                />
                <img
                  src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.0e3166482a69f6e0f869a048cf5c06bb695e2577.svg"
                  alt=""
                  className="w-24 h-24 border border-blue-300 rounded-md hover:opacity-60 cursor-pointer object-fill"
                />
                <img
                  src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.0e3166482a69f6e0f869a048cf5c06bb695e2577.svg"
                  alt=""
                  className="w-24 h-24 border border-blue-300 rounded-md hover:opacity-60 cursor-pointer object-fill"
                />
                <img
                  src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.0e3166482a69f6e0f869a048cf5c06bb695e2577.svg"
                  alt=""
                  className="w-24 h-24 border border-blue-300 rounded-md hover:opacity-60 cursor-pointer object-fill"
                />
              </div>
            </div>
          </div>
          <div className="bg-blue-400 flex-[7_7_0%]"></div>
        </div>
      </div>
    </>
  );
};

export default SetInfo;
