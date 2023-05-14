import React from "react";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import lgimage from "/public/image/login-p.jpg"
import { Console } from "console";
import {AiFillCheckCircle} from 'react-icons/ai'
import { axiosInstance } from '@/common/axios';
import { useRouter } from 'next/router';

const RegistrationPage = () => {
    const router =  useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [picture, setPicture] = useState<File | null>(null);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isFailed , setFailed] = useState(false);
    const [errors, setErrors] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file.type === 'image/jpeg') {
                setPicture(file);
            }
        }
    };

    const  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission here
        console.log(name, email, password, phone, address, picture);
        try {
            const response = await axiosInstance.post('/patients/registration', {
              name,
              email,
              password,
              phone,
              address
            });
            setIsSuccessful(true);
      
            
      
          } catch (error: any) {
            setFailed(true);
            console.log(error);
            setErrors(error.response.data.message);
      
          }
        
    };

    return (
        <div className="flex h-screen min-h-screen md:flex-row">
            {/* Left section */}
            <div className="flex items-center justify-center flex-1 bg-gray-200 md:w-1/2">
                <Image
                    src={lgimage}
                    alt="Registration Picture"
                    className="object-cover h-full "
                />
            </div>

            {/* Right section */}
            <div className="flex items-center justify-center flex-1 md:w-1/2">
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    {isSuccessful && (
                        <div  className="flex items-center justify-start my-4 text-green-500 space-between alert alert-success">
                            <AiFillCheckCircle />Registration done successfully!
                            
                        </div>
                        
                    )}
                    {isFailed && (
                        <div  className="flex items-center justify-start my-4 text-green-500 space-between alert alert-success">
                            <AiFillCheckCircle />Invalid Registration request!
                            
                        </div>
                        
                    )}
                    <h2 className="mb-4 text-2xl font-bold">Register</h2>

                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        className="block w-full h-8 mb-4 border-gray-400 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="block w-full h-8 mb-4 border-gray-400 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="block w-full h-8 mb-4 border-gray-400 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="block w-full h-8 mb-4 border-gray-400 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={handleAddressChange}
                        className="block w-full h-8 mb-4 border-gray-400 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <label htmlFor="picture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                       Upload Picture
                    </label>
                    <input

                        type="file"
                        id="picture"
                        name="picture"
                        onChange={handlePictureChange}
                        className="block w-full my-4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    />

                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        Register
                    </button>
                    <p className="mt-5 text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account ? <label onClick={() => router.push("/login")} className="font-medium text-blue-400 text-primary-600 hover:underline dark:text-primary-500">Login</label>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;