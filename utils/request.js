import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000, // request timeout
});

// request interceptor
service.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error),
);

// response interceptor
service.interceptors.response.use(
    (response) => response,
);

export default service;
