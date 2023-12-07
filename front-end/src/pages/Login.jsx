import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { loginRoute, refreshRoute } from '../utils/APIRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { getAPI, postAPI } from '../utils/FetchData';
import Loading from '../components/alert/Loading';
import CircularProgress from '@mui/material/CircularProgress';
import { seft } from '../redux/reducers/authReducer';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: 'user1@gmail.com',
    password: '@User123',
  });

  const { isLoading } = useQuery({
    queryKey: ['refresh_token'],
    queryFn: () => {
      return getAPI(refreshRoute);
    },
    onSuccess: data => {
      dispatch(
        seft({ ...data.data.user, access_token: data.data.access_token })
      );
      navigate('/');
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    enabled: localStorage.getItem('signed') === 'chat-app',
  });

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const { mutate, isLoading: loadingLogin } = useMutation({
    mutationFn: info => {
      return postAPI(loginRoute, info);
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: data => {
      toast.success(data.data.message, toastOptions);
      localStorage.setItem('signed', 'chat-app');
      navigate('/home');
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();
    handleValidation() && mutate(values);
  };

  const handleValidation = () => {
    const { password } = values;
    if (password < 6) {
      toast.error('Password needs to be at least 6 characters', toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-blue-100">
      {isLoading ? (
        <Loading />
      ) : (
        <div class="bg-white w-[400px] m-auto my-10 shadow-md border border-gray-200">
          <div class="py-8 px-8 rounded-xl">
            <h1 class="font-medium text-2xl text-center">Login</h1>
            <form class="mt-6" onSubmit={e => handleSubmit(e)}>
              <div class="my-4 text-sm">
                <label htmlFor="email" class="block text-black">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  class="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  required
                  onChange={e => handleChange(e)}
                />
              </div>
              <div class="my-4 text-sm">
                <label for="password" class="block text-black">
                  Password
                </label>
                <input
                  type="password"
                  class="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  required
                  onChange={e => handleChange(e)}
                />
                <div class="flex justify-end mt-2 text-xs text-gray-600">
                  <a href="#">Forget Password?</a>
                </div>
              </div>

              <button
                type="submit"
                disabled={loadingLogin}
                class="block text-center text-white bg-[#3386ff] hover:bg-[#0068ff] p-3 duration-300 rounded-sm  w-full"
              >
                {loadingLogin ? (
                  <div className="flex items-center justify-center gap-1">
                    Loading...
                    <CircularProgress size={20} color="inherit" />
                  </div>
                ) : (
                  <p>Login</p>
                )}
              </button>
            </form>

            {/* <div class=" gap-2 mt-7">
              <div>
                <button class="block text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-200 w-full border border-green">
                  Google
                </button>
              </div>
            </div> */}
            <p class="mt-12 text-sm text-center font-light text-gray-400">
              {' '}
              Don't have an account?{' '}
              <Link to="/register" class="text-black font-medium">
                {' '}
                Create One{' '}
              </Link>{' '}
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
export default Login;
