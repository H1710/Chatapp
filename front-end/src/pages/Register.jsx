import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {
  confirmOTPRoute,
  firstStepRegisterationRoute,
  registerRoute,
  sendOTPRoute,
  setInfoRoute,
} from '../utils/APIRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { postAPI } from '../utils/FetchData';
import { validRegister } from '../utils/Valid';
import { useMutation } from 'react-query';
import Loading from '../components/alert/Loading';

function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [OTPCode, setOTPCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const { mutate: firstStep, isLoading: loadingFirstStep } = useMutation({
    mutationFn: info => {
      return postAPI(firstStepRegisterationRoute, info);
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: data => {
      toast.success(data.data.message, toastOptions);
      setCurrentStep(2);
    },
  });

  const { mutate: submitOTP, isLoading: loadingSubmitOTP } = useMutation({
    mutationFn: info => {
      return postAPI(confirmOTPRoute, {
        email: values.email,
        OTPCode: OTPCode,
      });
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: data => {
      toast.success(data.data.message, toastOptions);
      setCurrentStep(3);
    },
  });

  const { mutate: submitInfo, isLoading: loadingSubmitInfo } = useMutation({
    mutationFn: info => {
      return postAPI(setInfoRoute, {
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
      });
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: data => {
      toast.success(data.data.message, toastOptions);
      navigate('/login');
    },
  });

  const submitFirstStep = async e => {
    e.preventDefault();
    const check = validRegister(values);
    if (check.errLength > 0) {
      toast.error(check.errMsg[0], toastOptions);
    } else {
      firstStep(values);
    }
  };

  const submitOTPCode = async e => {
    e.preventDefault();
    submitOTP(OTPCode);
  };

  const submitUserInfo = async e => {
    e.preventDefault();
    submitInfo();
  };
  const handleChange = e => {
    let value = e.target.files ? e.target.files : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };
  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-[#cdcfd3]">
      {loadingFirstStep || loadingSubmitOTP || loadingSubmitInfo ? (
        <Loading />
      ) : (
        <div className="bg-white w-[400px] m-auto my-10 shadow-md">
          <div className="mx-4 p-4">
            <div className="flex items-center">
              <div className="flex items-center text-gray-500 relative">
                <div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                    currentStep >= 2 ? 'bg-[#3386ff] text-white' : ''
                  } border-[#3386ff]`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-user-plus"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">
                  Account
                </div>
              </div>
              <div
                className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                  currentStep >= 2 ? 'border-[#66a4ff]' : 'border-gray-300'
                }`}
              ></div>
              <div className="flex items-center text-gray-500 relative">
                <div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                    currentStep >= 2 ? 'border-[#3386ff]' : 'border-gray-300'
                  } ${currentStep >= 3 ? 'bg-[#3386ff] text-white' : ''}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-mail"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">
                  Message
                </div>
              </div>
              <div
                className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                  currentStep >= 3 ? 'border-[#66a4ff]' : 'border-gray-300'
                }`}
              ></div>{' '}
              <div className="flex items-center text-gray-500 relative">
                <div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                    currentStep >= 3 ? 'border-[#3386ff]' : 'border-gray-300'
                  } ${currentStep >= 4 ? 'bg-[#3386ff] text-white' : ''}`}
                >
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-database"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">
                  Confirm
                </div>
              </div>
            </div>
          </div>
          <div className="py-8 px-8 rounded-xl">
            {currentStep === 1 && (
              <form className="mt-4" onSubmit={e => submitFirstStep(e)}>
                <div className="my-4 text-sm">
                  <label htmlFor="email" className="block text-black">
                    Email
                  </label>
                  <input
                    type="email"
                    autoFocus
                    className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                    placeholder="Email"
                    name="email"
                    required
                    onChange={e => handleChange(e)}
                  />
                </div>
                <div className="my-4 text-sm">
                  <label for="password" className="block text-black">
                    Password
                  </label>
                  <input
                    type="password"
                    className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={e => handleChange(e)}
                  />
                </div>
                <div className="my-4 text-sm">
                  <label htmlFor="email" className="block text-black">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    autoFocus
                    className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    required
                    onChange={e => handleChange(e)}
                  />
                  <div className="flex justify-end mt-2 text-xs text-gray-600">
                    <a href="#">Forget Password?</a>
                  </div>
                </div>

                <div className="flex gap-20">
                  <button
                    type="submit"
                    className="flex-1 text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-200 w-full border border-green"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="flex-1 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black"
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
            {currentStep === 2 && (
              <form className="mt-4" onSubmit={e => submitOTPCode(e)}>
                <div className="my-4 text-sm">
                  <label htmlFor="email" className="block text-black">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                    placeholder="Enter OTP"
                    name="OTPCode"
                    required
                    onChange={e => setOTPCode(e.target.value)}
                  />
                  <div className="flex justify-end mt-2 text-xs text-gray-600">
                    <a href="#">Resend OTP</a>
                  </div>
                </div>

                <div className="flex gap-20 mt-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    type="submit"
                    className="flex-1 text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-200 w-full border border-green"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="flex-1 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black"
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {currentStep === 3 && (
              <form className="mt-4" onSubmit={e => submitUserInfo(e)}>
                <div className="my-4 text-sm">
                  <label htmlFor="email" className="block text-black">
                    First name
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                    placeholder="First name"
                    name="firstname"
                    required
                    onChange={e => handleChange(e)}
                  />
                </div>
                <div className="my-4 text-sm">
                  <label htmlFor="email" className="block text-black">
                    Last name
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                    placeholder="Last name"
                    name="lastname"
                    required
                    onChange={e => handleChange(e)}
                  />
                </div>

                <div className="flex mt-4">
                  <button
                    type="submit"
                    className="flex-1 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}

            <div className="mt-12 text-sm text-center font-light text-gray-400">
              {currentStep === 1 && (
                <p>
                  Have an account?{' '}
                  <Link to="/login" className="text-black font-medium">
                    {' '}
                    Login{' '}
                  </Link>{' '}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
