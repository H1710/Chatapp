import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { loginRoute, refreshRoute } from '../../../utils/APIRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { getAPI, postAPI } from '../../../utils/FetchData';
import Loading from '../../../components/alert/Loading';
import { seft } from '../../../redux/reducers/authReducer';
import LoginForm from './LoginForm';

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
      navigate('/home');
    },
    onError: error => {
      toast.error(error.response.data.message);
    },
    enabled: localStorage.getItem('signed') === 'chat-app',
  });

  const { mutate, isLoading: loadingLogin } = useMutation({
    mutationFn: info => {
      return postAPI(loginRoute, info);
    },
    onError: error => {
      toast.error(error.response.data.message);
    },
    onSuccess: data => {
      toast.success(data.data.message);
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
      toast.error('Password needs to be at least 6 characters');
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
        <LoginForm
          values={values}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          loadingLogin={loadingLogin}
        />
      )}
      <ToastContainer />
    </div>
  );
}
export default Login;
