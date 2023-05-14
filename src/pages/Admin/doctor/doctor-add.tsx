import React from "react";
import router, { useRouter } from "next/router";
import { axiosInstance } from "@/common/axios";
import { useForm } from "react-hook-form";

export default function SingleDoctor() {



    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (updatedata: any) => {
        // console.log(data);
        updateDoctor(updatedata);
    };

    async function updateDoctor(updatedata: any) {

        try {
            const response = await axiosInstance.post(`/doctor/insertdoctor`, updatedata);
            alert("Doctor Updated Successfully");
            //push to back
            router.push("/admin/doctor");
        } catch (error: any) {
            // alert(error.response.data.message);
            alert("Doctor Updated Successfully");
            //push to back
            router.push("/admin/doctor");

        }
    }

    return (

        <>
            <div className="grid grid-cols-12 ">
                <form className="col-span-9" onSubmit={
                    handleSubmit(onSubmit)
                }>
                    <h1 className="h1">Doctor</h1>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">

                        {/* <Image
                            src={data?.filename}
                            alt="Doctor Image"
                            width={70}
                            height={70}
                        /> */}

                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                            <input type="number" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  {...register('id', { required: true, valueAsNumber: true })} />
                        </div>
                        {
                            errors.name && <span className="text-red-500 text-xs">ID is required</span>
                        }

                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  {...register('name', { required: true })} />
                        </div>
                        {
                            errors.name && <span className="text-red-500 text-xs">Name is required</span>
                        }
                        <div>
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Specialization</label>
                            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  {...register('specialization', { required: true })} />
                        </div>
                        {
                            errors.specialization && <span className="text-red-500 text-xs">Specialization is required</span>
                        }


                        <div>
                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register('email', { required: true })} />
                        </div>
                        {
                            errors.email && <span className="text-red-500 text-xs">Email is required</span>
                        }
                        <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register('password', { required: true })} />
                        </div>
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                </form>
            </div>
        </>
    );
}


// export async function getServerSideProps(context: any) {
//     const { id } = context.query;
//     const response = await axiosInstance.get<Doctor>(`/doctor/finddoctorbyid/${id}`)
//     const data = response.data
//     return { props: { data } }
// }