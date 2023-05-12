import axios from "axios";


export const axiosInstance = axios.create({

  // baseURL: 'https://hospital-management-system-production-7b6c.up.railway.app/', 


  baseURL: 'http://localhost:3000/',
  // timeout: 1000,
  headers: { 'Content-Type': 'application/json'}
  , withCredentials: true,

});