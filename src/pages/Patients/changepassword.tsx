import React, { useEffect, useState } from "react";
import Sidebar from "./Components/sidebar";
import { useRouter } from "next/router";
import { axiosInstance } from "@/common/axios";
import { Session } from "inspector";

export default function ChangePassword() {

    const router = useRouter();

    const [user, setUser] = useState<{ currpassword?: string, newpassword?: string, confirmpassword?: string } | null >(null);


    const [userdata, setUserdata] = useState(null);

    const [userid, setUserid] = useState(null);

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
            setUserdata(userData.data.password);
            setUserid(userData.data.id);
            
        }
        fetchData();
    }, []);

    if(userid == null)
    {
        return <div>Loading...</div>;
    }

   
    const handleUpdateEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUser((prevState: any) => ({ ...prevState, [id]: value }));
       
      };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // save those data in local variable
        const currpass = user?.currpassword;
        const newpass = user?.confirmpassword;
        const password = user?.newpassword;

        console.log("curr pass: ", currpass, "Newpass:" , password , "Con Pass: ", newpass);
        if(currpass != userdata)
        {
            alert("Current password is incorrect");
            return;
        }
        if(newpass != password)
        {
            alert("New password and confirme password need to be matched");
            return;
        }
      
        try {
            const response = await axiosInstance.patch(`/patients/updatepatients/${userid}`, {
               password
            });
            
            alert("Password Changed successfully.");
            console.log(response);
            router.push("/Patients/login");
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <>

            <div className="grid grid-cols-12 ">


                <Sidebar />


                <div className="col-span-9">

                    <div className="flex justify-center px-6 mx-auto my-24 lg:max-w-3xl md:max-w-xl">
                        <h2 className="px-6 mb-12 text-3xl font-bold text-white">Change Password</h2>
                    </div>


                    <div className="flex-1">
                        <div className="p-4">
                            <form onSubmit={onSubmit}>


                                <div className="w-full mb-6 md:w-1/2 md:pr-2">
                                    <label htmlFor="user_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                                    <input type="text" id="currpassword"  onChange={handleUpdateEvent}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                </div>
                                <div className="w-full mb-6 md:w-1/2 md:pr-2">
                                    <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <input type="text" id="newpassword"  onChange={handleUpdateEvent}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />

                                </div>
                                <div className="w-full mb-6 md:w-1/2 md:pr-2">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input type="text" id="confirmpassword" onChange={handleUpdateEvent}

                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />

                                </div>
                                


                                <div className="flex mt-6 justify-left">
                                    <button type="submit" className="px-4 py-2 mr-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">Confirm</button>
                                    <button type="button" onClick={() => router.back()} className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:shadow-outline">Cancel</button>
                                </div>


                            </form>
                        </div>

                    </div>

                </div>



            </div>
        </>
    )
}