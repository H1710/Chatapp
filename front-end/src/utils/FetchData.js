import axios from 'axios';
// axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  withCredentials: true,
  credentials: process.env.REACT_APP_SERVER_URL ? 'include' : 'same-origin',
  baseURL: process.env.REACT_APP_SERVER_URL
    ? 'https://chat-app-be-ptrn.onrender.com'
    : 'http://localhost:5001',
});

export const postAPI = async (url, info, token) => {
  const res = await axiosInstance.post(url, info, {
    headers: { Authorization: token },
  });
  return res;
};

export const getAPI = async (url, token) => {
  const res = await axiosInstance.get(url, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchAPI = async (url, info, token) => {
  const res = await axiosInstance.patch(url, info, {
    headers: { Authorization: token },
  });

  return res;
};
