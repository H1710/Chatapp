import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  confirmOTPRoute,
  firstStepRegisterationRoute,
  setInfoRoute,
} from '../../../utils/APIRoutes';
import { useDispatch } from 'react-redux';
import { postAPI } from '../../../utils/FetchData';
import { validRegister } from '../../../utils/Valid';
import { useMutation } from 'react-query';
import RegisterForm from './RegisterForm';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
    OTPCode: '',
    firstname: '',
    lastname: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [OTPCode, setOTPCode] = useState('');

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

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-blue-100">
      <RegisterForm
        values={values}
        submitFirstStep={submitFirstStep}
        loadingFirstStep={loadingFirstStep}
        setValues={setValues}
        submitOTPCode={submitOTPCode}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setOTPCode={setOTPCode}
        loadingSubmitOTP={loadingSubmitOTP}
        submitUserInfo={submitUserInfo}
        loadingSubmitInfo={loadingSubmitInfo}
      />
      <ToastContainer />
    </div>
  );
}

export default Register;
