import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { loginRoute, refreshRoute } from '../../../apis/APIRoutes';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { getAPI, postAPI } from '../../../apis/FetchData';
import Loading from '../../../components/Loading/Loading';
import LoginForm from './LoginForm';
import { IUserLogin } from '../../../models/auth.model';
import { setAuth } from '../../../redux/reducers/authReducer';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useQuery({
    queryKey: ['refresh_token'],
    queryFn: () => {
      return getAPI(refreshRoute, '');
    },
    onSuccess: (data: any) => {
      dispatch(setAuth({ ...data.user, access_token: data.access_token }));
      navigate('/home');
    },
    onError: (error: any) => {
      // toast.error(error.message);
    },
    enabled: localStorage.getItem('signed') === 'chat-app',
  });

  const { mutate, isLoading: loadingLogin } = useMutation({
    mutationFn: (info: IUserLogin) => {
      return postAPI(loginRoute, info, '');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data: any) => {
      toast.success(data.message);
      setAuth({ ...data.user, access_token: data.access_token });
      localStorage.setItem('signed', 'chat-app');
      navigate('/home');
    },
  });

  const handleSubmit = (e: React.FormEvent, values: IUserLogin) => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-blue-100">
      {isLoading ? (
        <Loading />
      ) : (
        <LoginForm handleSubmit={handleSubmit} loadingLogin={loadingLogin} />
      )}
      <ToastContainer />
    </div>
  );
};
export default Login;
