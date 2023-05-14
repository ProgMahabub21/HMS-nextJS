import React, { useEffect, useLayoutEffect, useRef,  useState } from "react";
import Sidebar from "./Components/sidebar";
import Image from 'next/image';
import docimg from "/public/image/doctor/profile-picture-1.png";
import { debounce } from "lodash";
import { axiosInstance } from "@/common/axios";
import SessionCheck from "./Components/sessionCheck";

export default function MakeAppointment() {
    const [showProfile, setShowProfile] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const handleMouseEnter = debounce(() => setShowProfile(true), 500);
    const handleMouseLeave = debounce((e: React.MouseEvent<HTMLDivElement>) => {
        if (!e.relatedTarget || !profileRef.current) return;
        if (profileRef.current.contains(e.relatedTarget as Node)) return;
        setShowProfile(false);
      }, 500);
 

    useLayoutEffect(() => {
        if (!buttonRef.current) {
            return;
          }
        else if (!profileRef.current){
            return;
        }
        const buttonRect = buttonRef.current?.getBoundingClientRect() as DOMRect;
        const profileRect = profileRef.current?.getBoundingClientRect() as DOMRect;
        const hasSpaceAbove = buttonRect.top > profileRect.height;
        const top = hasSpaceAbove ? buttonRect.top - profileRect.height : buttonRect.bottom;
        const left = buttonRect.left + (buttonRect.width - profileRect.width) / 2;
        setPosition({ top, left });
      }, [showProfile]);
    return (
        <>
            <SessionCheck/>
            <div className="grid grid-cols-12 ">


                


                <div className="col-span-9">
                    <h1>Make Appointment</h1>

                    <div onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                       className="relative"
                    >
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            
                        >
                            View Profile
                        </button>
                        {showProfile && (
                            <div
                                ref={profileRef}
                                className="absolute right-0 z-10 w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 top-12 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
                                style={{ top: position.top, left: position.left }}
                            >
                                <div className="p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <a href="#">
                                            <Image
                                                className="w-10 h-10 rounded-full"
                                                src={docimg}
                                                alt="Jese Leos"
                                            />
                                        </a>
                                        <div>
                                            <button
                                                type="button"
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                            >
                                                Follow
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                                        <a href="#">Jese Leos</a>
                                    </p>
                                    <p className="mb-3 text-sm font-normal">
                                        <a href="#" className="hover:underline">
                                            @jeseleos
                                        </a>
                                    </p>
                                    <p className="mb-4 text-sm">
                                        Open-source contributor. Building{' '}
                                        <a
                                            href="#"
                                            className="text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            flowbite.com
                                        </a>
                                        .
                                    </p>
                                    <ul className="flex text-sm">
                                        <li className="mr-2">
                                            <a href="#" className="hover:underline">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    799
                                                </span>
                                                <span>Following</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="hover:underline">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    3,758
                                                </span>
                                                <span>Followers</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div data-popper-arrow></div>
                            </div>
                        )}
                    </div>

                </div>

                {/* make a button on which hover effect will display a user profile card */}




            </div>





        </>
    )
}

