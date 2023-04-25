import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { changeInfo } from '../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';

const SetInfo = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    fullname: auth.fullname,
    username: auth.username,
    email: auth.email,
    phone: auth.phone,
  });

  const [edit, setEdit] = useState({
    fullname: true,
    username: true,
    password: true,
  });

  const handleChange = e => {
    let value = e.target.files ? e.target.files : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    dispatch(changeInfo({ ...values, _id: auth._id }, auth));
  };

  return (
    <div className="h-full w-[50%] bg-[#F9FBFF] bg-opacity-80 rounded-xl overflow-hidden shadow-lg flex items-center justify-center space-x-3">
      <div className="flex flex-col p-10 gap-10">
        <div className="w-full flex items-center gap-4">
          <div className="flex flex-row gap-4 flex-1">
            {auth.avatar ? (
              <img
                src={'data:image/png;base64, ' + auth.avatar?.imageBase64}
                alt={auth.fullname}
                className="w-20 h-20 rounded-full shadow-lg"
                title={auth.fullname}
              />
            ) : (
              <div
                className=" text-[50px] text-[rgb(249,251,255)] h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-r from-[#79C7C5] to-[#A1E2D9]"
                title={auth.fullname}
              >
                <p>{auth?.fullname[0]}</p>
              </div>
            )}

            <div className="flex flex-col">
              <div className="text-2xl text-[#79C7C5] font-normal">
                {auth?.fullname.length > 15
                  ? auth.fullname.substring(0, 15) + '...'
                  : auth.fullname}
              </div>
              <div className="text-lg text-[#79C7C5] font-normal">
                {auth?.username.length > 15
                  ? auth.username.substring(0, 15) + '...'
                  : auth.username}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="rounded hover:bg-opacity-95 bg-[#63a09e] text-white font-medium py-2 px-2 flex items-center gap-1"
              onClick={() => navigate('/setAvatar')}
            >
              <BiEditAlt fontSize={26} />
              <span>Edit avartar</span>
            </button>
          </div>
        </div>
        <form
          enctype="multipart/form-data"
          className="w-full h-full flex flex-col gap-10 justify-center items-center"
          onSubmit={e => handleSubmit(e)}
        >
          <div className="grid grid-cols-2 grid-flow-row gap-4">
            <div className="">
              <p className="pl-2">Email</p>
              <div className="flex items-center w-[88%] disabled">
                <input
                  className="w-full bg-[#000000] bg-opacity-20 h-[40px] border-[#777777] border-[2px] outline-none rounded-md p-2 "
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  disabled
                />
              </div>
            </div>

            <div className="">
              <p className="pl-2">Phone</p>
              <div className="flex items-center w-[88%]">
                <input
                  className="w-full bg-[#000000] bg-opacity-20 h-[40px] border-[#777777] border-[2px] outline-none rounded-md p-2"
                  type="phone"
                  placeholder="Phone"
                  name="phone"
                  value={values.phone}
                  disabled
                />
              </div>
            </div>
            <div className="">
              <p className="pl-2">Username</p>
              <div className="flex items-center">
                <input
                  className="w-full bg-[#F9FBFF] h-[40px] border-[#777777] border-[2px] outline-none rounded-md p-2"
                  type="username"
                  placeholder="Username"
                  name="username"
                  value={values.username}
                  onChange={e => handleChange(e)}
                  disabled={edit.username}
                />
                <div
                  onClick={() =>
                    setEdit({
                      ...edit,
                      ['username']: !edit['username'],
                    })
                  }
                  className="cursor-pointer"
                >
                  {edit.username ? (
                    <BiEditAlt fontSize={26} />
                  ) : (
                    <AiOutlineCloseCircle fontSize={26} />
                  )}
                </div>
              </div>
            </div>
            <div className="">
              <p className="pl-2">Fullname</p>
              <div className="flex items-center">
                <input
                  className="w-full bg-[#F9FBFF] h-[40px] border-[#777777] border-[2px] outline-none rounded-md p-2"
                  type="fullname"
                  placeholder="Fullname"
                  name="fullname"
                  value={values.fullname}
                  onChange={e => handleChange(e)}
                  disabled={edit.fullname}
                />
                <div
                  onClick={() =>
                    setEdit({
                      ...edit,
                      ['fullname']: !edit['fullname'],
                    })
                  }
                  className="cursor-pointer"
                >
                  {edit.fullname ? (
                    <BiEditAlt fontSize={26} />
                  ) : (
                    <AiOutlineCloseCircle fontSize={26} />
                  )}
                </div>
              </div>
            </div>
            <div className="">
              <p className="pl-2">Password</p>
              <div className="flex items-center w-[88%]">
                <input
                  className="w-full bg-[#F9FBFF] h-[40px] border-[#777777] border-[2px] outline-none rounded-md p-2"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={e => handleChange(e)}
                  disabled={edit['password']}
                />
                {/* <div
                  onClick={() =>
                    setEdit({
                      ...edit,
                      ['password']: !edit['password'],
                    })
                  }
                >
                  {edit.password ? (
                    <BiEditAlt fontSize={26} />
                  ) : (
                    <AiOutlineCloseCircle fontSize={26} />
                  )}
                </div> */}
              </div>
            </div>
          </div>
          <button
            className="w-50 h-10 rounded hover:bg-opacity-95 bg-[#63a09e] text-white"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetInfo;
