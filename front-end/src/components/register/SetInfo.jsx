import { CircularProgress } from '@mui/material';
import React from 'react';

const SetInfo = ({ submitUserInfo, handleChange, loadingSubmitInfo }) => {
  return (
    <form className="mt-4" onSubmit={e => submitUserInfo(e)}>
      <div className="my-4 text-sm">
        <label htmlFor="email" className="block text-black">
          First name
        </label>
        <input
          type="text"
          autoComplete="off"
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
          autoComplete="off"
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
          disabled={loadingSubmitInfo}
          className="flex-1 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black"
        >
          {loadingSubmitInfo ? (
            <>
              Loading...
              <CircularProgress size={20} />
            </>
          ) : (
            <p>Submit</p>
          )}
        </button>
      </div>
    </form>
  );
};

export default SetInfo;
