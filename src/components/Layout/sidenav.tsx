import { useRouter } from "next/router";
import React from "react";
import { FaFlipboard, FaBed } from "react-icons/fa";
import { TbNote } from 'react-icons/tb'
import NavItem from "./navitem";

interface Props {
    children: React.ReactNode;
}

const Sidenav = ({ children }: Props) => {
    const router = useRouter();

    //get the route name
    const currentPageName = router.pathname.split("/")[1];

    let navBarItems: {
        name: string;
        link?: string;
        icon: JSX.Element;
        children?: {
            name: string;
            link: string;
        }[];
    }[] = [];

    console.log("currentPageName ", currentPageName);

    switch (currentPageName.toLocaleLowerCase()) {
        case "admin":
            navBarItems = [
                {
                    name: "Dashboard",
                    link: "/admin/dashboard",
                    icon: <FaFlipboard />,
                },
                {
                    name: "Patients",

                    icon: <FaBed />,
                    children: [
                        {
                            name: "Patient List",
                            link: "/admin/patient",
                        },
                        {
                            name: "Add Patient",
                            link: "/admin/patient/patient-add",
                        },
                    ],
                }, {
                    name: "Doctor",

                    icon: <FaBed />,
                    children: [
                        {
                            name: "Doctor List",
                            link: "/admin/doctor",
                        },
                        {
                            name: "Add Doctor",
                            link: "/admin/doctor/doctor-add",
                        },
                    ],
                }, {
                    name: "Apponments",

                    icon: <TbNote />,
                    children: [
                        {
                            name: "Apponments List",
                            link: "/admin/apponment",
                        },
                    ],
                },
                {
                    name: "Products",
                    link: "/Admin/products",
                    icon: <FaFlipboard />,
                }
            ];

            break;

        default:
            break;
    }

    return (
        <>
            <button
                data-drawer-target="separator-sidebar"
                data-drawer-toggle="separator-sidebar"
                aria-controls="separator-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>
            <aside
                id="separator-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {navBarItems.map((nav, i) => (
                            <NavItem
                                key={i}
                                title={nav.name}
                                link={nav.link}
                                icon={nav.icon}
                                navItems={nav.children}
                            />
                        ))}
                    </ul>

                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                        <NavItem title="test 2" icon={<FaFlipboard />} link="#" />

                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                    <path
                                        fillRule="evenodd"
                                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="ml-3">Documentation</span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                                </svg>
                                <span className="ml-3">Components</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/admin"
                                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="ml-3">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="p-4 sm:ml-64">{children}</div>
        </>
    );
};

export default Sidenav;
