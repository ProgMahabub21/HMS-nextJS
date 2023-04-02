// create a component function with props
import React from "react";
import Image from "next/image";
import logo from "/public/image/system-logo.png"
import Link from "next/link";

const Sidebar = (props: any) => {
    return (
        <div className="col-span-3 overflow-y-scroll text-white bg-gray-900 divide-y-2 overscroll-behavior-y-auto ">
        <div className="flex justify-start px-3 py-4 my-4">
            <Image src={logo} alt="MediGrid Logo" width={84} height={84}  />
            <h1 className="px-4 py-4 text-3xl place-content-center">MediGrid</h1>

        </div>

        <div>
            <Link href="/Patients/makeappointment" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Make Appointment</Link>
            <Link href="/Patients/mailservice" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Send Mail</Link>
            <Link href="/Patients/searchdoctors" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Find Doctors</Link>
            <Link href="/Patients/searchmedicine" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Search Medicines</Link>
            <Link href="/Patients/viewprescription" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">View Prescriptions</Link>
            <Link href="/Patients/viewappointment" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Appointments</Link>
            <Link href="/Patients/makeorder" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Place Order</Link>
            <Link href="/Patients/makepayment" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Make Payments</Link>
            <Link href="/Patients/orderlist" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Orders List</Link>
            <Link href="/Patients/searchdiagnosis" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Diagnosis Services</Link>
            <Link href="/Patients/paymentrecords" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Payment Records</Link>



        </div>
        <div>
            <Link href="/Patients/registration" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Registration</Link>
            <Link href="/Patients/profile" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Profile</Link>
            <Link href="/Patients/changepassword" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Change Password </Link>
            <Link href="/Patients/deleteaccount" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Delete Account</Link>
            <Link href="/Patients/login" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Logout</Link>
        </div>
        <div>
            <Link href="/Patients/contactinfo" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Contact Us</Link>
        </div>


    </div>

    )
}

export default Sidebar;