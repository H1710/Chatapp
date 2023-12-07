import { CircularProgress } from '@mui/material';
import React from 'react';

const ConfirmOTP = ({
  submitOTPCode,
  setCurrentStep,
  setOTPCode,
  loadingSubmitOTP,
}) => {
  return (
    <form className="mt-4" onSubmit={e => submitOTPCode(e)}>
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
          onChange={e => setOTPCode(e.target.value)}
        />
        <div className="flex justify-end mt-2 text-xs text-gray-600">
          <a href="#">Resend OTP</a>
        </div>
      </div>

      <div className="flex gap-20 mt-4">
        <div
          onClick={() => setCurrentStep(1)}
          className="cursor-pointer flex-1 text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-200 w-full border border-green"
        >
          Previous
        </div>
        <button
          type="submit"
          disabled={loadingSubmitOTP}
          className={`flex-1 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black flex justify-center items-center gap-2`}
        >
          {loadingSubmitOTP ? (
            <>
              Loading...
              <CircularProgress size={20} />
            </>
          ) : (
            <p>Next</p>
          )}
        </button>
      </div>
    </form>
  );
};

export default ConfirmOTP;
