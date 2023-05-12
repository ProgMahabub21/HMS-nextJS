import React from "react";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51N6KAlDVaqngytN0P2fbU2rv9HpZx55S0zfa9a88pzGmixwg6MZs0ay4gp12x6Mga6u2NxDtmRI2AeaMADikB5vM00u9Cqk2OQ', {
    apiVersion: '2022-11-15',
});


export default function Dashboard({ data }: { data: Stripe.PaymentIntent[] }) {


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
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({ }) {
    const payments = await stripe.paymentIntents.list({
        limit: 5,
    });
    const data = payments.data
    return { props: { data } }
}