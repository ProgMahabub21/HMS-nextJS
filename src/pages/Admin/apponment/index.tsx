import React from "react";
import { axiosInstance } from "../../common/axios";
import { Patient } from "@/models/Patient";
import { NextRouter, useRouter } from "next/router";
import { Appointments } from "@/models/Appointment";




export default function Appointment({ data }: { data: Appointments[] }) {
    const router: NextRouter = useRouter();

    const handleRowClick = (id: string) => {
        console.log(id)
        router.push(`/admin/patient/${id}`)
    }
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
                            data.map((appointment, i) => {
                                return (
                                    <tr className="bg-white dark:bg-gray-800" key={i} onClick={() => handleRowClick(appointment.id)}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {appointment.id.slice(4, 12)}
                                        </th>
                                        <td className="px-6 py-4">
                                            {appointment.appDateTime.toString()}
                                        </td>   <td className="px-6 py-4">
                                            {appointment.status}
                                        </td>
                                        <td className="px-6 py-4">
                                            {appointment.doctor.name}
                                        </td>

                                        <td className="px-6 py-4">
                                            {appointment.patient.name}
                                        </td>
                                        {/* <td className="px-6 py-4">
                                            {patient.address}
                                        </td> */}
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
    const response = await axiosInstance.get<Patient[]>("/patients/appointmenthistory")
    const data = response.data
    return { props: { data } }
}