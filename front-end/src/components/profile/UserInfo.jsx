import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineCamera } from 'react-icons/ai';
import { SlOptions } from 'react-icons/sl';
import ChangeInfoForm from '../ChangeInfoForm';
import ChangeAvatarForm from '../ChangeAvatarForm';

const UserInfo = () => {
  const auth = useSelector(state => state.auth.auth);
  const [openEditInfo, setOpenEditInfo] = useState(false);
  const [openEditAvatar, setOpenEditAvatar] = useState(false);

  return (
    <>
      <div className="h-full flex-1 bg-white bg-opacity-80 overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-thumb-rounded">
        {/* Header */}
        <div className="px-20 shadow-sm">
          <div className=" w-full flex items-center gap-4 mt-6 pb-3 px-10 border-b border-[#dbdfe2]">
            <div className="flex flex-row gap-10 justify-center items-center">
              {auth.avatar ? (
                <div className="group cursor-pointer relative overflow-hidden text-[50px] rounded-full text-[rgb(249,251,255)] w-44 h-44 flex items-center justify-center border border-gray-300 shadow">
                  <img
                    src={auth.avatar}
                    alt={auth.firstname + ' ' + auth.lastname}
                    className="w-full h-full object-cover border border-gray-300 shadow"
                    title={auth.firstname + ' ' + auth.lastname}
                  />
                  <div
                    className="absolute bg-black w-full h-1/2 hidden bottom-0 bg-opacity-30 group-hover:flex group-hover:flex-col group-hover:items-center group-hover:bottom-4 group-hover:animate-fade-up"
                    onClick={() => {
                      setOpenEditAvatar(true);
                    }}
                  >
                    <AiOutlineCamera size={40} />
                    <span className="group-hover:block text-lg">Change</span>
                  </div>
                </div>
              ) : (
                <div
                  className="group cursor-pointer relative overflow-hidden text-[50px] rounded-full text-[rgb(249,251,255)] w-44 h-44 flex items-center justify-center bg-[#66a4ff] border border-gray-300 shadow"
                  title={auth.firstname + ' ' + auth.lastname}
                >
                  <p>{auth.firstname[0]}</p>
                  <div
                    className="absolute bg-black w-full h-1/2 hidden bottom-0 bg-opacity-30 group-hover:flex group-hover:flex-col group-hover:items-center group-hover:bottom-4 group-hover:animate-fade-up"
                    onClick={() => {
                      setOpenEditAvatar(true);
                    }}
                  >
                    <AiOutlineCamera size={40} />
                    <span className="group-hover:block text-lg">Change</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col w-full gap-4">
              <div className=" text-3xl font-bold text-black truncate">
                {auth.firstname + ' ' + auth.lastname}
              </div>
              <button
                className="w-36 rounded hover:bg-opacity-95 bg-[#3386ff] hover:bg-[#0068ff]  text-white font-medium py-2 px-2 flex items-center gap-1"
                onClick={() => {
                  setOpenEditInfo(true);
                }}
              >
                <BiEditAlt fontSize={22} />
                <span>Edit your info</span>
              </button>
            </div>
          </div>
          {/* <div className="flex items-center justify-between pr-2">
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
          </div> */}
        </div>

        {/* Body */}
        {/* <div className="px-32 flex gap-4 bg-[#f0f2f5] pt-3">
          <div className="flex flex-col gap-4">
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
          <div className="bg-white flex-[7_7_0%]"></div>
        </div> */}
        <ChangeInfoForm
          openEditInfo={openEditInfo}
          setOpenEditInfo={setOpenEditInfo}
        />
        <ChangeAvatarForm
          openEditAvatar={openEditAvatar}
          setOpenEditAvatar={setOpenEditAvatar}
        />
      </div>
    </>
  );
};

export default UserInfo;
