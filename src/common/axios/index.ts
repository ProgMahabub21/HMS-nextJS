import axios from "axios";


export const axiosInstance = axios.create({

  //  baseURL: 'https://medgrid.up.railway.app/', // live


 baseURL: 'http://localhost:3000/',
  // timeout: 1000,
  headers: { 'Content-Type': 'application/json'}
  , withCredentials: true,

});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      window.location.href = '/admin';
    }
  });