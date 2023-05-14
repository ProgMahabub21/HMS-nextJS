import axios from "axios";

export const axiosInstance = axios.create({
     baseURL: 'https://medgrid.up.railway.app/',   // live backend
    // timeout: 1000,
   // baseURL: 'http://localhost:3000/', // if you run on local backend
    headers: {'content-type': 'application/json'}

  });