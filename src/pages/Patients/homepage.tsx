// generate boilerplate
import React from "react";
import Image from "next/image";
import logo from "/public/system-logo.png"

export default function HomePage() {

    return (

        <>
            <div className="grid grid-cols-12 ">
                <div className="col-span-3 overflow-y-scroll text-white bg-gray-900 divide-y-2 overscroll-behavior-y-auto ">
                    <div className="flex justify-start px-3 py-4 my-4">
                        <Image src={logo} alt="MediGrid Logo" width={84} height={84}  />
                        <h1 className="px-4 py-4 text-3xl place-content-center">MediGrid</h1>

                    </div>

                    <div>
                        <a href="/Patients/makeappointment" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Make Appointment</a>
                        <a href="/Patients/mailservice" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Send Mail</a>
                        <a href="/Patients/searchdoctors" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Find Doctors</a>
                        <a href="/Patients/searchmedicine" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Search Medicines</a>
                        <a href="/Patients/viewprescription" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">View Prescriptions</a>
                        <a href="/Patients/viewappointment" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Appointments</a>
                        <a href="/Patients/makeorder" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Place Order</a>
                        <a href="/Patients/makepayment" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Make Payments</a>
                        <a href="/Patients/orderlist" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Orders List</a>
                        <a href="/Patients/searchdiagnosis" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Diagnosis Services</a>
                        <a href="/Patients/paymentrecords" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Payment Records</a>



                    </div>
                    <div>
                        <a href="/Patients/registration" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Registration</a>
                        <a href="/Patients/profile" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Profile</a>
                        <a href="/Patients/changepassword" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Change Password </a>
                        <a href="/Patients/deleteaccount" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Delete Account</a>
                        <a href="/Patients/login" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Logout</a>
                    </div>
                    <div>
                        <a href="/Patients/contactinfo" className="flex items-center px-4 py-2 space-x-3 font-bold text-gray-300 hover:text-white">Contact Us</a>
                    </div>


                </div>

                <div className="col-span-9 text-center bg-white overscroll-contain text-cyan-400">
                    <h1 className="">This is Patients Homepage/Dashboard Page.</h1>
                </div>

            </div>

        </>
    )
}
