import React, { ChangeEvent, FormEvent, useState } from 'react';
import TopBar from '../../../components/Register/TopBar';
import FirstStep from '../../../components/Register/FirstStep';
import ConfirmOTP from '../../../components/Register/ConfirmOTP';
import SetInfo from '../../../components/Register/SetInfo';
import { Link } from 'react-router-dom';
import { IUserRegiter } from '../../../models/auth.model';

interface RegisterFormProps {
  currentStep: number;
  loadingFirstStep: boolean;
  loadingSubmitOTP: boolean;
  loadingSubmitInfo: boolean;
  setCurrentStep: (step: number) => void;
  submitFirstStep: (e: FormEvent, values: IUserRegiter) => void;
  submitOTPCode: (e: FormEvent, values: IUserRegiter) => void;
  submitUserInfo: (e: FormEvent, values: IUserRegiter) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  loadingFirstStep,
  currentStep,
  loadingSubmitOTP,
  loadingSubmitInfo,
  submitFirstStep,
  setCurrentStep,
  submitOTPCode,
  submitUserInfo,
}) => {
  const [values, setValues] = useState<IUserRegiter>({
    email: '',
    password: '',
    confirmPassword: '',
    OTPCode: '',
    firstname: '',
    lastname: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.files ? e.target.files : e.target.value;
    setValues(prev => ({ ...prev, [e.target.name]: value }));
  };

  return (
    <div className="bg-white w-[400px] m-auto my-10 shadow-md border border-gray-100 p-8 rounded">
      <TopBar currentStep={currentStep} />
      {currentStep === 1 && (
        <FirstStep
          values={values}
          submitFirstStep={submitFirstStep}
          handleChange={handleChange}
          loadingFirstStep={loadingFirstStep}
        />
      )}
      {currentStep === 2 && (
        <ConfirmOTP
          submitOTPCode={submitOTPCode}
          setCurrentStep={setCurrentStep}
          values={values}
          handleChange={handleChange}
          loadingSubmitOTP={loadingSubmitOTP}
        />
      )}

      {currentStep === 3 && (
        <SetInfo
          values={values}
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
  );
};

export default RegisterForm;
