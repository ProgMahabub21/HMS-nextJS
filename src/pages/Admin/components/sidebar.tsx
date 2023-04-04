// create a component function with props
import React from "react";
import Image from "next/image";
import logo from "/public/image/system-logo.png"
import Link from "next/link";

const Sidebar = (props: any) => {
    return (
        <div className="col-span-3 overflow-y-scroll text-white bg-gray-900 divide-y-2 overscroll-behavior-y-auto ">
            <div className="flex justify-start px-3 py-4 my-4">
                <Image src={logo} alt="MediGrid Logo" width={84} height={84} />
                <h1 className="px-4 py-4 text-3xl place-content-center">MediGrid</h1>

            </div>

            <div>
                <Link href="/Admin/dashboard" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Dashboard</Link>

                <Link href="/Admin/admins" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Admins</Link>

                <Link href="/Admin/admin-add" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Add Admin</Link>

                <Link href="/Admin/patients" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Patients</Link>

                <Link href="/Admin/patient-update" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Add Update</Link>

                <Link href="/Admin/doctor-payments" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Doctor Paymnets</Link>

                <Link href="/Admin/products" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Products</Link>

                <Link href="/Admin/product-add" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Add Product</Link>

                <Link href="/Admin/users" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Users</Link>

                <Link href="/Admin/user-update" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Update User</Link>

            </div>
            <div>
                <Link href="/Patients/profile" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Profile</Link>
                <Link href="/Patients/changepassword" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Change Password </Link>
                <Link href="/Patients/login" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Logout</Link>
            </div>
            <div>
                <Link href="/" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Contact Us</Link>
            </div>


        </div>

    )
}

export default Sidebar;