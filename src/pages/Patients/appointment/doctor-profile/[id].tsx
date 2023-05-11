import React from "react";
import { NextRouter, useRouter } from "next/router";
import { axiosInstance } from "@/pages/common/axios";
import { Patient } from "@/models/Patient";
import { Doctor } from "@/models/Doctor";
import Image from "next/image";
import Sidebar from "../../Components/sidebar";
import docimg from "/public/image/doctor/profile-picture-1.png";

export default function SinleDoctor({ data }: { data: Doctor }) {
    const router: NextRouter = useRouter();

    console.log(data)

    function handlerowclick() {
        const doctorId = data.id;
        const userdata = sessionStorage.getItem("userid");
        axiosInstance.post(`/patients/bookappointment/${userdata}`, {
            doctorId
        })
            .then(response => {
                console.log(response.data)
                alert("Appointment booked successfully. Now go to payment option to pay the due bill to valid your appointment")
                router.push(`/Patients/homepage`);
            })
            .catch(error => {
                alert("Appointment booking went wrong. Try again later");
                console.error('Error fetching data:', error);
            });

    }

    return (

        <>
            <div className="grid grid-cols-12 ">

                <Sidebar />

                <div className="col-span-9">
                    <div className="h-48 p-10">

                        <div className="w-full lg:max-w-full lg:flex">
                            <div className="flex-none h-48 overflow-hidden text-center bg-cover rounded-t lg:w-48 lg:rounded-t-none lg:rounded-l" >
                                <Image className="w-48 h-48 rounded" src={data.filename? docimg:data.filename} alt="Avatar of Writer" height={48} width={48} />
                            </div>
                            <div className="flex flex-col justify-between p-4 mx-2 leading-normal bg-white border-b border-l border-r border-gray-400 rounded lg:border-l-0 lg:border-t lg:border-gray-400 lg:rounded">
                                <div className="mb-8">
                                    <p className="flex items-center text-sm text-gray-600">
                                        <svg className="w-3 h-3 mr-2 text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                        </svg>
                                        Members only
                                    </p>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="mb-2 text-xl font-bold text-gray-900">{data.name}</div>
                                        <div>
                                            <button type="button" onClick={() => { handlerowclick() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Confirm Appointment</button>
                                        </div>

                                    </div>

                                    <p className="my-4 mt-4 text-base text-gray-700">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
                                    <div className="mb-2 font-bold text-gray-900 text-">Specialization: {data.specialization}</div>
                                </div>
                                <div className="flex items-center">
                                    <Image className="w-10 h-10 mr-4 rounded-full" src={docimg} alt="Avatar of Writer" />
                                    <div className="text-sm">
                                        <p className="leading-none text-gray-900"></p>
                                        <p className="text-gray-600">Aug 18</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <h1>Doctor</h1>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">

                        <Image
                            src={data?.filename}
                            alt="Doctor Image"
                            width={70}
                            height={70}
                        />

                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.name} required />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Specialization</label>
                            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.specialization} required />
                        </div>


                        <div>
                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data?.email ?? "abc@gmail.com"} required />
                        </div>
                        {/* <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" value={data.filename} required />
                        </div> 
                    </div> */}

                    {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button> */}
                </div>



            </div>
        </>
    );
}


export async function getServerSideProps(context: any) {
    const { id } = context.query;
    const response = await axiosInstance.get<Doctor>(`/doctor/finddoctorbyid/${id}`)
    const data = response.data
    return { props: { data } }
}