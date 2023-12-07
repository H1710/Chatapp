import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  confirmOTPRoute,
  firstStepRegisterationRoute,
  setInfoRoute,
} from '../utils/APIRoutes';
import { useDispatch } from 'react-redux';
import { postAPI } from '../utils/FetchData';
import { validRegister } from '../utils/Valid';
import { useMutation } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import FirstStep from '../components/register/FirstStep';
import ConfirmOTP from '../components/register/ConfirmOTP';
import SetInfo from '../components/register/SetInfo';
import TopBar from '../components/register/TopBar';

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

  const submitFirstStep = async e => {
    e.preventDefault();
    const check = validRegister(values);
    if (check.errLength > 0) {
      toast.error(check.errMsg[0], toastOptions);
    } else {
      firstStep(values);
    }
  };

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

  const submitOTPCode = async e => {
    e.preventDefault();
    submitOTP(OTPCode);
  };

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
    <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-blue-100">
      <div className="bg-white w-[400px] m-auto my-10 shadow-md border border-gray-100 p-8">
        <TopBar currentStep={currentStep} />
        {currentStep === 1 && (
          <FirstStep
            submitFirstStep={submitFirstStep}
            handleChange={handleChange}
            loadingFirstStep={loadingFirstStep}
          />
        )}
        {currentStep === 2 && (
          <ConfirmOTP
            submitOTPCode={submitOTPCode}
            setCurrentStep={setCurrentStep}
            setOTPCode={setOTPCode}
            loadingSubmitOTP={loadingSubmitOTP}
          />
        )}

        {currentStep === 3 && (
          <SetInfo
            submitUserInfo={submitUserInfo}
            handleChange={handleChange}
            loadingSubmitInfo={loadingSubmitInfo}
          />
        )}

        <div className="mt-6 text-sm text-center font-light text-gray-400">
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
      <ToastContainer />
    </div>
  );
}

export default Register;
