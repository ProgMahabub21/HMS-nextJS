import React from "react";
import Sidebar from "./Components/sidebar";
import SessionCheck from "./Components/sessionCheck";

export default function MakePayment() {
    return (
        <>
            <SessionCheck/>
            <div className="grid grid-cols-12 ">


            


                <div className="col-span-9">
                    <h1>Make Payment Service</h1>
                </div>



            </div>
       
        </>
    )
}