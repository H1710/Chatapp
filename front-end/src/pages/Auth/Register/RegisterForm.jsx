import React from 'react';
import TopBar from '../../../components/Register/TopBar';
import FirstStep from '../../../components/Register/FirstStep';
import ConfirmOTP from '../../../components/Register/ConfirmOTP';
import SetInfo from '../../../components/Register/SetInfo';
import { Link } from 'react-router-dom';

const RegisterForm = ({
  values,
  setValues,
  submitFirstStep,
  loadingFirstStep,
  currentStep,
  setCurrentStep,
  setOTPCode,
  submitOTPCode,
  loadingSubmitOTP,
  submitUserInfo,
  loadingSubmitInfo,
}) => {
  const handleChange = e => {
    let value = e.target.files ? e.target.files : e.target.value;
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
  );
};

export default RegisterForm;
