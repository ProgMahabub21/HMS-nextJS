import React from "react";
import Sidebar from "./Components/sidebar";

export default function UserProfile() {
    return (
        <>

            <div className="grid grid-cols-12 ">


                <Sidebar />


                <div className="col-span-9">
                    <h1>Patients Account rofile</h1>
                </div>



            </div>

            
        </>
    )
}