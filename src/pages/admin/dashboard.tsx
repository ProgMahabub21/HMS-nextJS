import BarChart from "@/components/barchart";
import PieChart from "@/components/chart";
import React from "react";
import Stripe from 'stripe';
import { getServerSession } from "next-auth/next"
import { getExpressSession } from "@/common/utils/session";
import { axiosInstance } from "@/common/axios";
const stripe = new Stripe('sk_test_51N6KAlDVaqngytN0P2fbU2rv9HpZx55S0zfa9a88pzGmixwg6MZs0ay4gp12x6Mga6u2NxDtmRI2AeaMADikB5vM00u9Cqk2OQ', {
    apiVersion: '2022-11-15',
});


export default function Dashboard({ data, appointment }: { data: Stripe.PaymentIntent[], appointment: any[] }) {


    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-full min-w-full">
                    <h1 className="h1">Dashboard</h1>
                    <div className="w-full bg-white shadow-md rounded-md p-4">
                        <h2 className="h2">Payments</h2>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span className="text-gray-400">Total</span>
                                <span className="text-2xl">${
                                    data.reduce((acc, curr) => {
                                        return acc + curr.amount
                                    }, 0) / 100 * 30 * 12
                                }</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-400">Today</span>
                                <span className="text-2xl">${
                                    data.filter((payment) => {
                                        const today = new Date()
                                        const date = new Date(payment.created * 1000)
                                        return today.getDate() === date.getDate()
                                    }).reduce((acc, curr) => {
                                        return acc + curr.amount
                                    }, 0) / 100
                                }</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-400">This Month</span>
                                <span className="text-2xl">${
                                    data.filter((payment) => {
                                        const today = new Date()
                                        const date = new Date(payment.created * 1000)
                                        return today.getMonth() === date.getMonth()
                                    }
                                    ).reduce((acc, curr) => {
                                        return acc + curr.amount
                                    }, 0) / 100 * 30
                                }</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-400">This Year</span>
                                <span className="text-2xl">${
                                    data.filter((payment) => {
                                        const today = new Date()
                                        const date = new Date(payment.created * 1000)
                                        return today.getFullYear() === date.getFullYear()
                                    }
                                    ).reduce((acc, curr) => {
                                        return acc + curr.amount
                                    }
                                        , 0) / 100 * 12 * 5
                                }</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-around pt-5">
                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Apponment</h5>
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {appointment.map((item, i) => (
                                        <li className="py-3 sm:py-4" key={i}>
                                            <div className="flex items-center space-x-4">
                                                {/* <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" />
                                                </div> */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        {
                                                            item.id
                                                        }
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        {
                                                            item.appDateTime
                                                        }
                                                    </p>
                                                </div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    {
                                                        item.status
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        </div>
                        <PieChart />
                        {/* <BarChart /> */}
                    </div>



                </div>

            </div>
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    //get and print session


    getExpressSession(ctx)

    const appointment = await axiosInstance.get('/doctor/findappointment');

    const firstFive = appointment.data.slice(0, 5)



    const payments = await stripe.paymentIntents.list({
        limit: 5,
    });
    const data = payments.data
    return { props: { data, appointment: firstFive } }
}