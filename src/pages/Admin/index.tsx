import { useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '../common/axios';
import { useRouter } from 'next/router';




export default function LoginPage() {
    const router = useRouter();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState('');


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/admin/login', {
                email,
                password
            });

            router.push('/admin/dashboard');

        } catch (error: any) {
            console.log(error);
            setErrors(error.response.data.message);

        }
    };
    return (



        <>


            {
                errors && <div className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline">{errors}</span>
                </div>
            }

            <div className="flex items-center justify-center h-screen">
                <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">

                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                </form>
            </div></>
    );
}
