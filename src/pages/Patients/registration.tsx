import React from "react";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import lgimage from "/public/image/login-p.jpg"
import { Console } from "console";
import {AiFillCheckCircle} from 'react-icons/ai'

const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [picture, setPicture] = useState<File | null>(null);
    const [isSuccessful, setIsSuccessful] = useState(false);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission here
        console.log(name, email, password, phone, address, picture);
        setIsSuccessful(true);
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
                        <div className="flex items-center justify-start my-4 text-green-500 space-between alert alert-success">
                            <AiFillCheckCircle />Registration request submitted successfully!
                        </div>
                    )}
                    <h2 className="mb-4 text-2xl font-bold">Register</h2>

                    <label htmlFor="name" className="block mb-2 font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        className="block w-full h-8 mb-4 border-gray-400 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    <label htmlFor="email" className="block mb-2 font-medium">
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

                    <label htmlFor="password" className="block mb-2 font-medium">
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

                    <label htmlFor="phone" className="block mb-2 font-medium">
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

                    <label htmlFor="address" className="block mb-2 font-medium">
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
                    <label htmlFor="picture" className="block mb-2 font-medium">
                        Picture
                    </label>
                    <input

                        type="file"
                        id="picture"
                        name="picture"
                        onChange={handlePictureChange}
                        className="block w-full h-8 mb-4 border-gray-400 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;