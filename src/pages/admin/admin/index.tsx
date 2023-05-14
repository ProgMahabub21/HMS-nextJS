import React from "react";
import { Patient } from "@/models/Patient";
import { NextRouter, useRouter } from "next/router";
import SearchBar from "@/components/searchbar";
import { Admin } from "@/models/Admin";
import { axiosInstance } from "@/common/axios";
import { getExpressSession } from "@/common/utils/session";




export default function Admins({ data }: { data: Admin[] }) {
    const router: NextRouter = useRouter();

    const handleRowClick = (id: string) => {

    }
    return (
        <>
            <SearchBar placeholder="search..." onSubmit={() => { }} />
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {
                                ["id", "firstName", "middleName", "lastName", "email", "phone"].map((key, i) => {
                                    return (
                                        <th key={i} className="px-6 py-3">
                                            {key}
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((admin, i) => {
                                return (
                                    <tr className="bg-white dark:bg-gray-800 cursor-pointer" key={i}  >
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {admin.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {admin.firstName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {admin.middleName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {admin.lastName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {admin.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {admin.phone}
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>


        </>
    )
}

export async function getServerSideProps(ctx: any) {


    const session = getExpressSession(ctx)
    const response = await axiosInstance.get<Admin[]>("/admin", {
        headers: {
            cookie: session
        }
    })
    const data = response.data
    return { props: { data } }
}