import React, { useState, useEffect } from "react";
import Sidebar from "./Components/sidebar";
import { axiosInstance } from "../common/axios";
import { useRouter } from "next/router";

export default  function UserProfile() {

    const router = useRouter();

    const [user, setUser] = useState<{ id?: string, name?: string, email?: string, phone?: string, address?: string } | null>(null);


    useEffect(() => {
        async function fetchData() {
            const session = await sessionStorage.getItem("userid");
            if (!session) {
                return {
                    redirect: {
                        destination: "/unauthorized",
                        permanent: false,
                    },
                };
            }

            // Fetch user profile data
            const userData = await axiosInstance.get(`/patients/finduserid/${session}`
            );
            setUser(userData.data);
            
        }
        fetchData();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }
    const handleUpdateEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUser((prevState) => ({ ...prevState, [id]: value }));
      };

    const onSubmit = async () => {
        try {
            const response = await axiosInstance.patch(`/patients/updatepatients/${user.id}`, {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            });
            console.log(response);
            router.push("/Patients/homepage");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        
            <div className="grid grid-cols-12 ">


                <Sidebar />


                <div className="col-span-9">

                    <div className="container flex flex-col min-h-screen mx-auto justify-evenly ">

                        <h1 className="px-4 text-3xl font-semibold">Account Profile</h1>

                        <div className="flex-1">
                            <div className="p-4">
                                <form onSubmit={onSubmit}>
                                   

                                        <div className="w-full md:w-1/2 md:pr-2">
                                            <label htmlFor="user_id" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Account ID</label>
                                            <input type="text" id="user_id" defaultValue={user?.id} disabled
                                                className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                                        </div>
                                        <div className="w-full md:w-1/2 md:pr-2">
                                            <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</label>
                                            <input type="text" id="full_name" defaultValue={user?.name} onChange={handleUpdateEvent}
                                                className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />

                                        </div>
                                        <div className="w-full md:w-1/2 md:pr-2">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                                            <input type="text" id="email" defaultValue={user?.email} onChange={handleUpdateEvent}

                                                className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />

                                        </div>
                                        <div className="w-full md:w-1/2 md:pr-2">
                                            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Phone Number</label>
                                            <input type="text" id="phone_number" defaultValue={user?.phone}  onChange={handleUpdateEvent}
                                                className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />

                                        </div>

                                        <div className="w-full md:w-1/2 md:pr-2">
                                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Address</label>
                                            <input type="text" id="address" defaultValue={user?.address}  onChange={handleUpdateEvent}

                                                className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                                        </div>


                                    <div className="flex mt-6 justify-left">
                                        <button type="submit" className="px-4 py-2 mr-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">Update</button>
                                        <button type="button" onClick={() => router.back()} className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:shadow-outline">Cancel</button>
                                    </div>

                                 
                                </form>
                            </div>

                        </div>
                    </div>
                </div>



            </div>


        </>
    )
}







