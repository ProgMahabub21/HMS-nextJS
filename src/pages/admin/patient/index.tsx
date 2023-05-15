import React from "react";
import { axiosInstance } from "@/common/axios";
import { Patient } from "@/models/Patient";
import { NextRouter, useRouter } from "next/router";
import SearchBar from "@/components/searchbar";
import SessionCheckAdmin from "@/pages/Patients/Components/sessionCheckADmin";




export default function Patients({ data }: { data: Patient[] }) {
    const router: NextRouter = useRouter();

    const handleRowClick = (id: string) => {
        console.log(id)
        router.push(`/admin/patient/${id}`)
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
                            data.map((patient, i) => {
                                return (
                                    <tr className="bg-white dark:bg-gray-800 cursor-pointer" key={i} onClick={() => handleRowClick(patient.id)} >
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {patient.id.slice(0, 4)}...
                                        </th>
                                        <td className="px-6 py-4">
                                            {patient.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {patient.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            ********
                                        </td>
                                        <td className="px-6 py-4">
                                            {patient.phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            {patient.address}
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

export async function getServerSideProps({ }) {
    const response = await axiosInstance.get<Patient[]>("/patients/finduser")
    const data = response.data
    return { props: { data } }
}