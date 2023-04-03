import React from "react";

export default function Register() {

    return (
        <>
           <div>
                <h2><b><u>Registration</u></b></h2>
                <form>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name"/><br></br>
                <label htmlFor="specialization">Specialization: </label>
                <input type="text" id="specialization" name="specialization"/><br></br>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email"/><br></br>
                <label htmlFor="password">Password: </label>
                <input type="text" id="password" name="password" /><br></br>
                <label htmlFor="confirmpassword">Confirm Password: </label>
                <input type="text" id="confirmpassword" name="confirmpassword"/><br></br><br></br>
                <button type="submit">Register</button>
                </form>
            </div>
        </>
    )
}