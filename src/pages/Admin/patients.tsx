import React from "react";
import { axiosInstance } from "../common/axios";
import { Patient } from "@/models/Patient";


export default function patients({ data }: { data: Patient[] }) {
    return (
        <>

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
                                    <tr className="bg-white dark:bg-gray-800" key={i}>
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
    const response = await axiosInstance.get<Patient[]>("/patients/finduser")
    const data = response.data
    return { props: { data } }
}