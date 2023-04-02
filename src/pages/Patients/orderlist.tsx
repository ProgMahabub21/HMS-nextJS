import React from "react";
import Sidebar from "./Components/sidebar";

export default function OrderList() {
    return (
        <>
            <div className="grid grid-cols-12 ">


                <Sidebar />


                <div className="col-span-9">
                    <h1>Medicine Order Lists</h1>
                </div>



            </div>
      
        </>
    )
}