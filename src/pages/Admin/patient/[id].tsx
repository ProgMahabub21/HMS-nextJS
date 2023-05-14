import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosInstance } from "@/common/axios";
import { Patient } from "@/models/Patient";
import router from "next/router";

export default function SinlePatient({ data }: { data: Patient }) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit: SubmitHandler<any> = data => {
        // return console.log(data);
        console.log(data);
        updatePatient(data);
    };

    console.log(errors);



    async function deletePatient() {
        console.log("delete");
        // console.log(data);
        try {
            var response = await axiosInstance.delete(`/patients/deletepatients/${data.id}`)
            //show alert
            alert("Patient Deleted Successfully");
            //push to back
            router.push("/admin/patient");
        }
        catch (error) {
            //show alert
            alert("Something went wrong");
        }
    }


    async function updatePatient(updateData: any) {
        // console.log(data);
        try {
            var response = await axiosInstance.patch(`/patients/updatepatients/${data.id}`, updateData)

            //show alert
            alert("Patient Updated Successfully");

            //redirect to home page
            router.push("/admin/patient");



        } catch (error) {
            //show alert
            alert("Something went wrong");

        }
    }


    return (

        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 ">
                    <div className="col-span-9">
                        <h1 className="h1">Patient</h1>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">

                            <div>
                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <span className="text-red-500 text-xs">{errors.Name && "Name is required"}</span>
                                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={data.name} {...register("name", {
                                    required: true,
                                })} />
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <span className="text-red-500 text-xs">{errors.Email && "Email is required"}</span>
                                <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={data.email} {...register("email", {
                                    required: true,

                                })} />
                            </div>


                            <div>
                                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={data.phone} {...register("phone", {
                                    required: true,
                                })} />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" defaultValue={data.address} {...register("address", {
                                    required: true,
                                })} />
                            </div>
                        </div>

                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>

                        <button type="button" onClick={deletePatient} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Delete</button>
                    </div>
                </div>
            </form>
        </>
    );
}


export async function getServerSideProps(context: any) {
    const { id } = context.query;
    const response = await axiosInstance.get<Patient>(`/patients/finduserid/${id}`)
    const data = response.data
    return { props: { data } }
}