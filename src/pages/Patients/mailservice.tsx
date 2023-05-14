import React, { useState } from "react";
import Sidebar from "./Components/sidebar";
import { axiosInstance } from "@/common/axios";
import SessionCheck from "./Components/sessionCheck";

export default function MailService() {
    const [receiver, setReceiver] = useState('');
    const [jsubject, setSubject] = useState('');
    const [msg, setMsg] = useState('');

    console.log(receiver, jsubject, msg);


    const handlesubmit = () => {



        const email = receiver;
        const text = msg;
        const subject = jsubject;

        // const mailtoLink = `mailto:abc@gmail.com?subject=Mail%20Service%20Submission&body=Email%20Address%20of%20Receiver:%20${email}%0D%0A%0D%0ASubject:%20${subject}%0D%0A%0D%0AMessage:%20${text}`;

        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(` ${text}`)}`;

        console.log(text);

        console.log(mailtoLink);

        window.location.href = mailtoLink;
    }
    return (
        <>
            <SessionCheck/>

            <div className="grid grid-cols-12 ">


              


                <div className="col-span-9">
                    {/* <!-- Container for demo purpose --> */}
                    <div className="container px-6 mx-auto my-24">

                        {/* <!-- Section: Design Block --> */}
                        <section className="mb-32 text-gray-800">
                            <div className="flex justify-center">
                                <div className="text-center lg:max-w-3xl md:max-w-xl">
                                    <h2 className="px-6 mb-12 text-2xl font-bold text-white">Send Us Your Query Through Our Own Mail Service</h2>
                                </div>
                            </div>



                            <div className="flex flex-wrap">
                                <div className="w-full px-3 mb-12 grow-0 shrink-0 basis-auto lg:mb-0 lg:w-5/12 lg:px-6">
                                    
                                    <form onSubmit={handlesubmit}>
                                        <div className="mb-6 form-group">
                                            <input type="email" className="form-control block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email"
                                                placeholder="Receiver's Email Address" onChange={(e) => setReceiver(e.target.value)} />
                                        </div>
                                        <div className="mb-6 form-group">
                                            <input type="text" className="form-control block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="subject"
                                                placeholder="Email Subject " onChange={(e) => setSubject(e.target.value)} />
                                        </div>
                                        <div className="mb-6 form-group">
                                            <textarea className="
form-control
block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
" id="exampleFormControlTextarea13" rows={3} placeholder="Email Message Body" onChange={(e) => setMsg(e.target.value)}></textarea>
                                        </div>
                                        <div className="mb-6 text-center form-group form-check">
                                            <input type="checkbox"
                                                className="w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
                                                id="msgbody" checked  />
                                            <label className="inline-block text-gray-800 form-check-label" htmlFor="exampleCheck87">Send me a copy of this
                                                message</label>
                                        </div>
                                        <button type="submit" className="
w-full
px-6
py-2.5
bg-blue-600
text-white
font-medium
text-xs
leading-tight
uppercase
rounded
shadow-md
hover:bg-blue-700 hover:shadow-lg
focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
active:bg-blue-800 active:shadow-lg
transition
duration-150
ease-in-out">Send</button>
                                    </form>
                                </div>
                                <div className="w-full grow-0 shrink-0 basis-auto lg:w-7/12">
                                    <div className="flex flex-wrap">

                                    </div>
                                </div>
                            </div>
                        </section>


                    </div>
                </div>



            </div>

        </>
    )
}

