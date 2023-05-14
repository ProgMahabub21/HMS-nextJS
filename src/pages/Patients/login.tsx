import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import lgimage from '/public/image/login-p.jpg'
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { axiosInstance } from '../../common/axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
//import { redirect } from 'next/router';

type LoginFormData = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginFormData>();
  const [errors, setErrors] = useState('');

  // defined sessionStorage

  

  const onSubmit = async (data: LoginFormData) => {


    //json stringify
    const email = data.email;
    const password = data.password;
    console.log(email, password)

    // call api and fetch data from " http://localhost:3005/patients/finduser" and match email password

    // if match redirect to "http://localhost:3005/Patients/homepage"

    // if not match show error message
    try {
      const response = await axiosInstance.post('/patients/login', {
        email,
        password
      });

     
      
      sessionStorage.setItem('userid', response.data.userid);
      sessionStorage.setItem('username', response.data.username);
      sessionStorage.setItem('usermail', response.data.email);
      const session = sessionStorage.getItem('userid');
      console.log('After Session data: '+ session);

      router.push('/Patients/homepage');

    } catch (error: any) {
      console.log(error);
      if (error.response.status == 500)
        setErrors(error.response.status + " login Credential invalid");

    }


  };





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
        {errors && <div className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{errors}</span>
        </div>}
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
          <p className="mt-5 text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <label onClick={() => router.push("/Patients/registration")} className="font-medium text-blue-400 text-primary-600 hover:underline dark:text-primary-500">Sign up</label>
          </p>
        </form></div>

      </div>
    
  );
};

export default LoginPage;
