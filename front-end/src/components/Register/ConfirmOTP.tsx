import React, { ChangeEvent, FormEvent } from 'react';
import CustomButton from '../Button/CustomButton';
import { IUserRegiter } from '../../models/auth.model';

interface ConfirmOTPProps {
  values: IUserRegiter;
  loadingSubmitOTP: boolean;
  submitOTPCode: (e: FormEvent, values: IUserRegiter) => void;
  setCurrentStep: (step: number) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ConfirmOTP: React.FC<ConfirmOTPProps> = ({
  values,
  loadingSubmitOTP,
  submitOTPCode,
  setCurrentStep,
  handleChange,
}) => {
  return (
    <form className="mt-4" onSubmit={e => submitOTPCode(e, values)}>
      <div className="my-4 text-sm">
        <label htmlFor="email" className="block text-black">
          OTP Code
        </label>
        <input
          type="text"
          autoComplete="off"
          className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
          placeholder="Enter OTP"
          name="OTPCode"
          required
          value={values['OTPCode']}
          onChange={e => handleChange(e)}
        />
        <div className="flex justify-end mt-2 text-xs text-gray-600">
          <span style={{ cursor: 'pointer', color: '#3386ff' }}>
            Resend OTP
          </span>
        </div>
      </div>

      <div className="flex gap-20 mt-4">
        <CustomButton
          classContent={
            'cursor-pointer flex-1 text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-200 w-full border border-green'
          }
          text={'Previous'}
          type="button"
          isLoading={false}
          handleSubmit={() => setCurrentStep(1)}
        />
        <CustomButton
          classContent={`flex-1 text-center text-white bg-[#3386ff] hover:bg-[#0068ff] p-3 duration-300 rounded-sm flex justify-center items-center gap-2`}
          text={'Next'}
          type="submit"
          isLoading={loadingSubmitOTP}
          handleSubmit={() => {}}
        />
      </div>
    </form>
  );
};

export default ConfirmOTP;
