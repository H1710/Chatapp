import { CircularProgress } from '@mui/material';
import React from 'react';

const FirstStep = ({ submitFirstStep, handleChange, loadingFirstStep }) => {
  return (
    <form className="mt-4" onSubmit={e => submitFirstStep(e)}>
      <div className="my-4 text-sm">
        <label htmlFor="email" className="block text-black">
          Email
        </label>
        <input
          type="email"
          autoComplete="off"
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
          autoComplete="off"
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
          autoComplete="off"
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
        <div className="flex-1 text-center text-black p-3 duration-300 rounded-sm w-full border border-green">
          Previous
        </div>
        <button
          type="submit"
          disabled={loadingFirstStep}
          className={`flex-1 text-center text-white bg-[#3386ff] hover:bg-[#0068ff] p-3 duration-300 rounded-sm flex justify-center items-center gap-2`}
        >
          {loadingFirstStep ? (
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

export default FirstStep;
