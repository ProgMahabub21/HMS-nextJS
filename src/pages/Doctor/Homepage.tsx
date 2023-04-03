import Link from "next/link";
import React from "react";

export default function HomePage() {

    return (
        <>
        <div>
        <center>
            <h2><b>This is the Home Page.</b></h2>
            <Link href="Login">Login</Link><br></br>
            <Link href="Register">Register</Link>
        </center>
        </div>
        </>
    )
}