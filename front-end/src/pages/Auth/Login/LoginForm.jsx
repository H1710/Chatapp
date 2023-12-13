import { CircularProgress } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../../../components/Button/CustomButton';

const LoginForm = ({ values, handleSubmit, handleChange, loadingLogin }) => {
  const formInput = [
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'password', type: 'password', label: 'Password' },
  ];
  return (
    <div class="bg-white w-[400px] m-auto my-10 shadow-md border border-gray-200 p-8 rounded">
      <h1 class="font-medium text-2xl text-center">Login</h1>
      <form class="mt-6" onSubmit={e => handleSubmit(e)}>
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
              value={values[item.name]}
              required
              onChange={e => handleChange(e)}
            />
          </div>
        ))}
        <div className="flex justify-end mb-4 text-xs text-gray-600">
          <a href="#">Forget Password?</a>
        </div>

        <CustomButton
          type={'submit'}
          classContent={`block mt-6 text-center text-white bg-[#3386ff] hover:bg-[#0068ff] p-3 duration-300 rounded-sm w-full`}
          text={'Login'}
          isLoading={loadingLogin}
        />
      </form>

      {/* <div class=" gap-2 mt-7">
              <div>
                <button class="block text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-200 w-full border border-green">
                  Google
                </button>
              </div>
            </div> */}
      <p class="mt-6 text-sm text-center font-light text-gray-400">
        {' '}
        Don't have an account?{' '}
        <Link to="/register" class="text-black font-medium">
          {' '}
          Create One{' '}
        </Link>{' '}
      </p>
    </div>
  );
};

export default LoginForm;
