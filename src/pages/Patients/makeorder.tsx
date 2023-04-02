import React from "react";
import Sidebar from "./Components/sidebar";

export default function MakeOrder() {
    return (
        <>
            <div className="grid grid-cols-12 ">


                <Sidebar />


                <div className="col-span-9">
                    <h1>Medicine Order Service</h1>
                </div>



            </div>
      
        </>
    )
}