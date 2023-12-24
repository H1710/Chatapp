import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  confirmOTPRoute,
  firstStepRegisterationRoute,
  setInfoRoute,
} from '../../../apis/APIRoutes';
import { postAPI } from '../../../apis/FetchData';
import { validFirstStep } from '../../../utils/Valid';
import { useMutation } from 'react-query';
import RegisterForm from './RegisterForm';
import {
  FirstStepRegister,
  SubmitOTPRegister,
  InfoUserRegister,
} from '../../../models/auth.model';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const { mutate: firstStep, isLoading: loadingFirstStep } = useMutation({
    mutationFn: (info: FirstStepRegister) => {
      console.log(info);
      return postAPI(firstStepRegisterationRoute, info, '');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: data => {
      toast.success(data.message);
      setCurrentStep(2);
    },
  });

  const submitFirstStep = async (
    e: React.FormEvent,
    values: FirstStepRegister
  ) => {
    e.preventDefault();
    const check = validFirstStep(values);
    if (check.errLength > 0) {
      toast.error(check.errMsg[0]);
    } else {
      firstStep(values);
    }
  };

  const { mutate: submitOTP, isLoading: loadingSubmitOTP } = useMutation({
    mutationFn: (info: SubmitOTPRegister) => {
      return postAPI(confirmOTPRoute, info, '');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: data => {
      toast.success(data.message);
      setCurrentStep(3);
    },
  });

  const submitOTPCode = (e: React.FormEvent, values: SubmitOTPRegister) => {
    e.preventDefault();
    submitOTP(values);
  };

  const { mutate: submitInfo, isLoading: loadingSubmitInfo } = useMutation({
    mutationFn: (info: InfoUserRegister) => {
      return postAPI(setInfoRoute, info, '');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: data => {
      toast.success(data.message);
      navigate('/login');
    },
  });

  const submitUserInfo = (e: React.FormEvent, values: InfoUserRegister) => {
    e.preventDefault();
    submitInfo(values);
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-blue-100">
      <RegisterForm
        submitFirstStep={submitFirstStep}
        loadingFirstStep={loadingFirstStep}
        submitOTPCode={submitOTPCode}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        loadingSubmitOTP={loadingSubmitOTP}
        submitUserInfo={submitUserInfo}
        loadingSubmitInfo={loadingSubmitInfo}
      />
      <ToastContainer />
    </div>
  );
};

export default Register;
