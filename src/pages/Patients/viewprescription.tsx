import React, { useState, useEffect } from "react";
import Sidebar from "./Components/sidebar";
import { axiosInstance } from "@/common/axios";
import { UUID } from "crypto";

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    email: string;
}

interface Appointment{
    id: number;
    appDateTime: string;
    status: string
}

interface AppointmentLists {
    id: number;
    medicine: string;
    dose: string;
    dateTime: string;
    doctor: Doctor;
    patientId: UUID;
    appointment: Appointment
    

}
export default function ViewAppointment() {
    const [AppointmentLists, setAppointmentLists] = useState<AppointmentLists[]>([]);
    const [filteredLists, setfilteredLists] = useState<AppointmentLists[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [medPerPage] = useState(15); // Number of Listss to display per page

    useEffect(() => {

        const data = sessionStorage.getItem("userid");
        // Fetch diagnosis Listss data from API and set to state
        axiosInstance.get(`/patients/prescriptionhistory/${data}`)
            .then(response => {
                
                setAppointmentLists(response.data);
                setfilteredLists(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching appointment Lists:', error);
            });
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        // Filter diagnosis Listss based on search term
        const filtered = AppointmentLists.filter(Lists =>
            Lists.id.toString().toLowerCase().includes(term.toLowerCase())
        );
        setfilteredLists(filtered);
    };

    // Get current Listss based on current page
    const indexOfLastLists = currentPage * medPerPage;
    const indexOfFirstLists = indexOfLastLists - medPerPage;
    const currentLists = filteredLists.slice(indexOfFirstLists, indexOfLastLists);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return (
        <>
            <div className="grid grid-cols-12 ">


                <Sidebar />


                <div className="col-span-9">
                    <div className="container flex flex-col min-h-screen mx-auto ">

                        <h1 className="px-4 text-3xl font-semibold">Prescription List</h1>

                        <div className="flex-1">
                            <div className="p-4">
                                <form>
                                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </div>
                                        <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by medicine name" value={searchTerm}
                                            onChange={handleSearch} required />
                                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                    </div>
                                </form>
                                <table className="w-full my-2 text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-t-md">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Prescription ID</th>
                                            <th scope="col" className="px-6 py-3">Medicine Name</th>
                                            <th scope="col" className="px-6 py-3">Dose</th>
                                            <th scope="col" className="px-6 py-3">Doctor Name</th>
                                            <th scope="col" className="px-6 py-3">Time</th>
                                            <th scope="col" className="px-6 py-3">Appointment ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentLists.map(Lists => (
                                            <tr key={Lists.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">{Lists.id}</td>
                                                <td className="px-6 py-4">{Lists.medicine }</td>
                                                <td className="px-6 py-4">{Lists.dose}</td>
                                                <td className="px-6 py-4">{Lists.doctor.name}</td>
                                                <td className="px-6 py-4">{Lists.dateTime}</td>
                                                <td className="px-6 py-4">{Lists.appointment.id}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex">
                                <div>
                                    <p className="justify-start h-5 px-4 text-gray-500">Showing {indexOfFirstLists + 1}-{Math.min(indexOfLastLists, filteredLists.length)} of {filteredLists.length} results</p>
                                </div>
                                <div className="flex justify-end px-48">

                                    <nav className="flex items-center space-x-20">
                                        <button
                                            className="px-4 py-2 text-white bg-gray-800 hover:bg-gray-700"
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            Prev
                                        </button>

                                        <button
                                            className="px-4 py-2 text-white bg-gray-800 hover:bg-gray-700"
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === Math.ceil(filteredLists.length / medPerPage)}
                                        >
                                            Next
                                        </button>
                                    </nav>
                                </div>
                            </div>

                        </div>
                    </div></div>




            </div>

        </>
    )
}