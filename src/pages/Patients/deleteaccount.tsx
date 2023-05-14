import React, { useState } from "react";
import { axiosInstance } from "@/common/axios";
import { useRouter } from 'next/router';
import Sidebar from "./Components/sidebar";
import SessionCheck from "./Components/sessionCheck";

export default function DeleteAccount() {


    const [UUID, setUUID] = useState('');
    const router = useRouter();
    

    const handleUUIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUUID(e.target.value);
    };
    
    const action = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            // delete http response
            e.preventDefault();
           const response = await axiosInstance.delete(`patients/deletepatients/${UUID}`);

            if (response.status === 200) {
                console.log("Account deleted successfully.");
                // display a message to the user
                alert("Account deleted successfully.");
            }

            router.push("/login");
        }catch (error: any) {
            console.log(error.data.message);
        }

    }


    return (
        <>
            <SessionCheck/>
            <div className="grid grid-cols-12 ">

                <div className="flex flex-col items-center justify-center col-span-9 space-y-4 md:w-1/2">
                    <div className="container flex flex-col min-h-screen mx-auto">
                        <div className="p-8 px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded item-center" role="alert">
                            <strong className="font-bold">Alert!</strong>
                        
                            <span className="block sm:inline">You are about to delete your account!! </span>
                            <span className="block sm:inline"> If you proceed , it will erase all data associated with the account</span>
                        </div>
                        <form onSubmit={action} className="max-w-sm p-8 rounded-lg shadow-md ">
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Account UUID</label>
                                <input type="UUID" id="email" onChange={handleUUIDChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" required />
                            </div>
                            
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div></div>

            </div>
        </>
    )
}

