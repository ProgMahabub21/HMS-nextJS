import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Sidebar from "./Components/sidebar";
import { axiosInstance } from "../common/axios";
import { UUID } from "crypto";
import Image from 'next/image';
import docimg from "/public/image/doctor/profile-picture-1.png";
import { debounce } from "lodash";
import { AiFillStar } from "react-icons/ai"
import { useRouter } from "next/router";

interface DoctorLists {
    id: number;
    name: string;
    specialization: string;
    email: string;
}

export default function ViewAppointment() {
    const [DoctorLists, setDoctorLists] = useState<DoctorLists[]>([]);
    const [filteredLists, setfilteredLists] = useState<DoctorLists[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [medPerPage] = useState(15); // Number of Listss to display per page
    const [showProfile, setShowProfile] = useState<number | null>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const handleMouseEnter = debounce((id: number) => {
        if (buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
           setPosition({ top: buttonRect.top - 888, left: 0 });
            setShowProfile(id);
        }
    }, 100);
    const handleMouseLeave = debounce((e: React.MouseEvent<HTMLDivElement>, id: number) => {
        if (!e.relatedTarget || !profileRef.current) return;
        if (profileRef.current.contains(e.relatedTarget as Node)) return;
        setShowProfile(prevProfile => prevProfile === id ? null : prevProfile);

    },);

    const router = useRouter();

    useLayoutEffect(() => {
        if (!buttonRef.current) {
            return;
        }
        else if (!profileRef.current) {
            return;
        }
        const buttonRect = buttonRef.current?.getBoundingClientRect() as DOMRect;
        const profileRect = profileRef.current?.getBoundingClientRect() as DOMRect;
       // const hasSpaceAbove = buttonRect.top > profileRect.height;
        // const top =  buttonRect.top + 8  ;
        // const left = buttonRect.left + (buttonRect.width - profileRect.width) / 2;
        // setPosition({ top, left });

        // console.log(top , " " , left)
    }, [showProfile]);

    useEffect(() => {
        // Fetch diagnosis Listss data from API and set to state
        axiosInstance.get('patients/findadoctor')
            .then(response => {

                setDoctorLists(response.data);
                setfilteredLists(response.data);
            })
            .catch(error => {
                console.error('Error fetching doctor Lists:', error);
            });
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        // Filter diagnosis Listss based on search term
        const filtered = DoctorLists.filter(Lists =>
            Lists.name.toLowerCase().includes(term.toLowerCase())
        );
        setfilteredLists(filtered);
    };

    // Get current Listss based on current page
    const indexOfLastLists = currentPage * medPerPage;
    const indexOfFirstLists = indexOfLastLists - medPerPage;
    const currentLists = filteredLists.slice(indexOfFirstLists, indexOfLastLists);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handlerowclick = (id: number) => {
        
        console.log(id)
        router.push(`/Patients/appointment/doctor-profile/${id}`)

    }

    return (
        <>
            <div className="grid grid-cols-12 ">


                <Sidebar />


                <div className="col-span-9">
                    <div className="container flex flex-col min-h-screen mx-auto ">

                        <h1 className="px-4 mt-8 text-3xl font-semibold text-white">Find Doctors</h1>

                        <div className="flex-1 mt-8">
                            <div className="p-4">
                                <form >
                                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </div>
                                        <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by doctor name" value={searchTerm}
                                            onChange={handleSearch} required />
                                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                    </div>
                                </form >
                                <table className="w-full my-2 mt-8 text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-t-md">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Doctor Profile</th>
                                            <th scope="col" className="px-6 py-3">Doctor Name</th>
                                            <th scope="col" className="px-6 py-3">Specilization</th>
                                            <th scope="col" className="px-6 py-3">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentLists.map(Lists => (

                                            <tr key={Lists.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">

                                                    <div 
                                                        className="relative"
                                                    >
                                                        <button
                                                            ref={buttonRef}
                                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                            onMouseEnter={() => handleMouseEnter(Lists.id)}
                                                        >
                                                            View profile
                                                        </button>
                                                        <div
                                                            ref={profileRef}
                                                            className={`absolute p-4 dark: bg-gray-800 dark:border-gray-600 border-white rounded-lg shadow-lg transition-opacity duration-300 z-10 ${showProfile === Lists.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                                                }`}

                                                                onMouseEnter={() => setShowProfile(Lists.id)}
                                                                onMouseLeave={(e) => handleMouseLeave(e, Lists.id)}

                                                            style={{
                                                                top: position.top,
                                                                left: position.left,
                                                            }}
                                                        >
                                                            <div className="p-3">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <a href="#">
                                                                        <Image className="w-10 h-10 rounded-full" src={docimg} alt="Jese Leos" />
                                                                    </a>
                                                                    <div>
                                                                        <button type="button" onClick={() => {handlerowclick(Lists.id)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Take Appointment</button>
                                                                    </div>
                                                                </div>
                                                                <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                                                                    <a href="#">{Lists.name} (ID:{Lists.id})</a>
                                                                </p>
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <p className="mb-3 text-sm font-normal">
                                                                        <a href="#" className="hover:underline">@{Lists.name}</a>
                                                                    </p>
                                                                    <p className="mb-3 text-sm font-normal">
                                                                        <a href="#">Joined Us- 3rd May, 2022</a>
                                                                    </p>
                                                                </div>


                                                                <p className="mb-4 text-sm">Qualification : MBBS (DMC)  Experience: 20 yrs.</p>
                                                                <ul className="flex text-sm">
                                                                    <li className="mr-2">
                                                                        <a href="#" className="hover:underline">
                                                                            <span className="font-semibold text-gray-900 dark:text-white">799</span>
                                                                            <span>Appointments</span>
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#" className="flex items-center hover:underline">
                                                                            <AiFillStar></AiFillStar>
                                                                            <span className="font-semibold text-gray-900 dark:text-white">4.8  </span>
                                                                            <span> Rating</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div data-popper-arrow></div>

                                                        </div>
                                                        

                                                    </div>


                                                </td>

                                                <td className="px-6 py-4">{Lists.name}</td>
                                                <td className="px-6 py-4">{Lists.specialization}</td>
                                                <td className="px-6 py-4">{Lists.email}</td>
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