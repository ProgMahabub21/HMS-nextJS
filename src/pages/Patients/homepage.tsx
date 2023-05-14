// generate boilerplate
import React from "react";
import Image from "next/image";
import logo from "/public/image/system-logo.png"
import Link from "next/link";
import { axiosInstance } from "@/common/axios";
import SessionCheck from "./Components/sessionCheck";


export default function HomePage() {

    
    

    return (

        <>
            <SessionCheck/>
            <div className="grid grid-cols-12 ">

            
               
               

                <div className="col-span-9 text-center bg-white overscroll-contain text-cyan-400">
                    <h1 className="">This is Patients Homepage/Dashboard Page.</h1>
                </div>

            </div>

        </>
    )
}

