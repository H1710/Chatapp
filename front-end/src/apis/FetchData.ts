import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse {
  data: any;
  status: number;
  message?: string;
}

const axiosInstance = axios.create({
  withCredentials: true,
  // credentials: process.env.REACT_APP_SERVER_URL ? 'include' : 'same-origin',
  baseURL: process.env.REACT_APP_SERVER_URL
    ? 'https://chat-app-be-ptrn.onrender.com'
    : 'http://localhost:5001',
});

export const postAPI = async (
  url: string,
  info: any,
  token: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  try {
    const res: AxiosResponse = await axiosInstance.post(url, info, config);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAPI = async (
  url: string,
  token: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  try {
    const res: AxiosResponse = await axiosInstance.get(url, config);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const patchAPI = async (
  url: string,
  info: any,
  token: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: token },
  };

  try {
    const res: AxiosResponse = await axiosInstance.patch(url, info, config);
    return res.data;
  } catch (error) {
    throw error;
  }
};
