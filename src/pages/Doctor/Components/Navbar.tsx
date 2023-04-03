import React from "react";
import Link from "next/link"

export default function Navbar(){
    return(
        <div>
        <Link href="/Doctor/Homepage">Home Page</Link><br></br>
        <Link href="/Doctor/NewAppointment">New Appointments</Link><br></br>
        <Link href="/Doctor/AppointmentHistory">Appointment History</Link><br></br>
        <Link href="/Doctor/ViewPatients">View Patients</Link><br></br>
        <Link href="/Doctor/NewPrescription">New Prescription</Link><br></br>
        <Link href="/Doctor/PrescriptionHistory">Prescription History</Link><br></br>
        <Link href="/Doctor/ViewPayments">View Payments</Link><br></br>
        <Link href="/Doctor/Dashboard">Dashboard</Link><br></br>
        <Link href="/Doctor/UpdatePassword">Update Password</Link><br></br>
        <Link href="/Doctor/DeleteAccount">Delete Account</Link><br></br>
        <Link href="/Doctor/Logout">Logout</Link><br></br>
        </div>
    )
}