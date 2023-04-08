import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import  lgimage from '/public/image/login-p.jpg'
import axios, {isCancel, AxiosError, AxiosResponse} from 'axios';
//import { redirect } from 'next/router';

type LoginFormData = {
    email: string;
    password: string;
  };

const onSubmit = async (data: LoginFormData) => {
    

    //json stringify
    const jsondata = JSON.stringify(data);

    console.log(jsondata);

    // call api and fetch data from " http://localhost:3005/patients/finduser" and match email password

    // if match redirect to "http://localhost:3005/Patients/homepage"

    // if not match show error message
    const axios = require("axios");
    const response = await axios.post("http://localhost:3000/patients/login", jsondata)
    
    .then((response: AxiosResponse) => {

      console.log(response)
      // const fetcheddata:any = response.data.email;
      // console.log(fetcheddata);
      // // Check if the API response indicates a match
      // if (data.email == fetcheddata.email && data.password == fetcheddata.password) {
      //   // Redirect to homepage
      //   window.location.href = "http://localhost:3000/Patients/homepage";
      // } else {
      //   // Show error message
      //   console.error("Email and password do not match.");
      //   // You can display the error message in your desired way, e.g., by appending it to the DOM or showing an alert.
      // }
    })
    .catch((error: AxiosError) => {
      console.error("Failed to fetch data from API:", error);
      // Handle error, e.g., by showing an error message
    });

    
};  

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();



  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="flex items-center justify-cente md:w-1/2">
        <Image
          src={lgimage}
          alt="Login image"
          className='object-cover h-full'
        />
      </div>
      <div className="flex items-center justify-center bg-gray-100 md:w-1/2">
        <form
          className="max-w-sm p-8 bg-white rounded-lg shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="mb-4 text-2xl font-bold">Log in to your account</h2>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              type="email"
              id="email"
              {...register('email', { required: true })}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-bold text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              type="password"
              id="password"
              {...register('password', { required: true })}
            />
          </div>
          <button
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
