import { CircularProgress } from '@mui/material';
import React from 'react';
import CustomButton from '../Button/CustomButton';

const SetInfo = ({ submitUserInfo, handleChange, loadingSubmitInfo }) => {
  const formInput = [
    { name: 'firstname', type: 'text', label: 'First Name' },
    { name: 'lastname', type: 'text', label: 'Last Name' },
  ];
  return (
    <form className="mt-4" onSubmit={e => submitUserInfo(e)}>
      {formInput.map((item, id) => (
        <div className="mt-4 text-sm" key={id}>
          <label htmlFor={item.name} className="block text-black">
            {item.label}
          </label>
          <input
            type={item.type}
            autoComplete="off"
            className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
            placeholder={item.label}
            name={item.name}
            required
            onChange={e => handleChange(e)}
          />
        </div>
      ))}

      <div className="flex mt-4">
        <CustomButton
          classContent={`flex-1 text-center text-white bg-[#3386ff] hover:bg-[#0068ff] p-3 duration-300 rounded-sm flex justify-center items-center gap-2`}
          text={'Submit'}
          type="submit"
          isLoading={loadingSubmitInfo}
        />
      </div>
    </form>
  );
};

export default SetInfo;
