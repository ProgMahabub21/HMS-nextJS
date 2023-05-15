import React from "react";
import { Doctor } from "@/models/Doctor";
import Image from 'next/image';
import { NextRouter, useRouter } from "next/router";
import SearchBar from "@/components/searchbar";
import { axiosInstance } from "@/common/axios";
import SessionCheckAdmin from "@/pages/Patients/Components/sessionCheckADmin";


export default function Doctors({ data }: { data: Doctor[] }) {



    const router: NextRouter = useRouter();

    const handleRowClick = (id: string | number) => {
        console.log(id)
        router.push(`/admin/doctor/${id}`)
    }



    if (!data || data.length === 0) {
        return <div>No Data found...</div>
    }


    return (
        <>
            <SessionCheckAdmin />
            <SearchBar placeholder="search..." onSubmit={() => { }} />
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {
                                Object.keys(data[0]).map((key, i) => {
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
                            data.map((doctor, i) => {
                                return (
                                    <tr className="bg-white dark:bg-gray-800 cursor-pointer" key={i} onClick={() => handleRowClick(doctor.id)}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {doctor.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {doctor.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {doctor.specialization}
                                        </td>
                                        <td className="px-6 py-4">
                                            {doctor.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            ********
                                        </td>
                                        <td className="px-6 py-4">
                                            <Image
                                                src={doctor?.filename}
                                                alt="Doctor Image"
                                                width={70}
                                                height={70}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                    <tfoot>
                        <tr className="font-semibold text-gray-900 dark:text-white">
                            <th scope="row" className="px-6 py-3 text-base">Total</th>
                            <td className="px-6 py-3">3</td>
                            <td className="px-6 py-3">21,000</td>
                        </tr>
                    </tfoot>
                </table>
            </div>


        </>
    )
}

export async function getServerSideProps({ }) {
    const response = await axiosInstance.get<Doctor[]>("/doctor/finddoctor")
    const data = response.data
    return { props: { data } }
}