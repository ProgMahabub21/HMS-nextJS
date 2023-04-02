import React from "react";
import Sidebar from "./Components/sidebar";

export default function SearchMedicine() {
    return (
        <>
            <div className="grid grid-cols-12 ">


                <Sidebar />


                <div className="col-span-9">
                     <h1>Total Medicine List</h1>
                </div>



            </div>
        
        </>
    )
}