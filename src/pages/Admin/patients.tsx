import React from "react";
import Sidebar from "./components/sidebar";


export default function SearchDiagnosis() {
    return (
        <>
            <div className="grid grid-cols-12 ">


                <Sidebar />


                <div className="col-span-9">
                    <h1>Patients</h1>
                </div>



            </div>

        </>
    )
}