import React from "react";
import Sidebar from "./Components/sidebar";

export default function ViewAppointment() {
    return (
        <>
            <div className="grid grid-cols-12 ">


                <Sidebar />


                <div className="col-span-9">
                     <h1>Appointment History</h1>
                </div>



            </div>
           
        </>
    )
}