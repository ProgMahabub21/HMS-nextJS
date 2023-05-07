import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://hospital-management-system-production-7b6c.up.railway.app/',   // live backend
    // timeout: 1000,
  //  baseURL: 'http://localhost:3000/', // if you run on local backend
    headers: {'content-type': 'application/json'}

  });