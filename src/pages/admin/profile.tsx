import { Admin } from "@/models/Admin";
import { axiosInstance } from "@/common/axios";
import { getExpressSession } from "@/common/utils/session";
import { SubmitHandler, useForm } from 'react-hook-form';
import { GetServerSidePropsContext } from "next";
import { cookies } from 'next/headers';

export default function AdminProfile({ data, id }: { data: Admin, id: any },) {

    const { register, handleSubmit, watch, control, reset, formState: { errors } } = useForm<any>();




    const onSubmit: SubmitHandler<any> = data => {

        // var adminUser = JSON.parse(sessionStorage.getItem("admin") || '{}')?.admin;

        try {
            axiosInstance.patch(`/admin/${id}`, data, {
                headers: {
                    // cookie: session
                }
            })
            alert("Profile updated successfully")
        } catch (error: any) {
            alert(error.message)
        }
    };


    return (
        <div className="flex justify-center pt-20">

            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Profile</h5>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" {...register("email", { required: "Email is required", })} defaultValue={data.email} />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message?.toString()}</p>}
                    {/* <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" {...register("password", {
                            required: "Email is required", minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
                        })} />
                    </div>
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message?.toString()}</p>} */}

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                        <input type="text" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" {...register("firstName", {
                            required: "firstName is required", minLength: {
                                value: 3,
                                message: "firstName must be at least 3 characters"
                            }
                        })} defaultValue={data.firstName} />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message?.toString()}</p>}
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                        <input type="text" id="password" placeholder="SA" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" {...register("lastName", {
                            required: "lastName is required", minLength: {
                                value: 3,
                                message: "lastName must be at least 8 characters"
                            }
                        })} defaultValue={data.lastName} />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message?.toString()}</p>}

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle name</label>
                        <input type="text" id="password" placeholder="JON" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" {...register("middleName", {
                            required: false, minLength: {
                                value: 3,
                                message: "middleName must be at least 8 characters"
                            }
                        })} defaultValue={data.middleName} />
                    </div>
                    {errors.middleName && <p className="text-red-500 text-xs italic">{errors.middleName.message?.toString()}</p>}

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                        <input type="tel" id="password" placeholder="017*******" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" {...register("phone", {
                            required: false, minLength: {
                                value: 11,
                                message: "phone must be at least 11 characters"
                            }
                        })} defaultValue={data.phone} />
                    </div>
                    {errors.middleName && <p className="text-red-500 text-xs italic">{errors.middleName.message?.toString()}</p>}

                    {/* <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div> */}
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                    {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div> */}
                </form>
            </div>
        </div>
    );
}



export async function getServerSideProps(ctx: GetServerSidePropsContext) {

    //get id from query
    const { id } = ctx.query

    const session = getExpressSession(ctx)


    const response = await axiosInstance.get<Admin>(`/admin/${id}`, { headers: { cookie: session } })
    const data = response.data
    return { props: { data, id } }
}