import React, { useEffect, useState } from "react";
import Sidebar from "./Components/sidebar";

import { axiosInstance } from "../common/axios";

interface Payment {
    paymentid: number;
    transactionid: string;
    amount: number;
    date: string;
}


export default function PaymentRecords() {

    const [data, setData] = useState<Payment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paymentsPerPage] = useState(10);

    // Pagination logic
    const indexOfLastPayment = currentPage * paymentsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
    const currentPayments = data.slice(indexOfFirstPayment, indexOfLastPayment);

    const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const session = sessionStorage.getItem("userid");
                if (!session) {
                    return {
                        redirect: {
                            destination: "/unauthorized",
                            permanent: false,
                        },
                    };
                    // Handle unauthorized access
                    return;
                }

                const res = await axiosInstance.get(`/patients/paymentrecords/${session}`);
                console.log(res.data);

                const fetchedData = res.data.map((item: { paymentID: any; refno: any; amount: any; datetime: any; }) => ({
                    paymentid: item.paymentID,
                    transactionid: item.refno,
                    amount: item.amount,
                    date: item.datetime,
                }));

                setData(fetchedData);
            } catch (error) {
                console.log("Error fetching payment records:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="grid grid-cols-12">
                <Sidebar />

                <div className="col-span-9">
                    <h1 className="px-4 mt-8 text-3xl font-semibold text-white">Payment History</h1>

                    <div className="flex-1 mt-8">
                        <div className="p-4">
                            <table className="w-full my-2 mt-8 text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-t-md">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Payment ID</th>
                                        <th scope="col" className="px-6 py-4 " style={{ maxWidth: '150px', wordWrap: 'break-word' }}>Transaction ID</th>
                                        <th scope="col" className="px-6 py-3">Amount</th>
                                        <th scope="col" className="px-6 py-3">Date</th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">View Details</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.paymentid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">{item.paymentid}</td>
                                            <td className="px-6 py-4">{item.transactionid}</td>
                                            <td className="px-6 py-4">{item.amount}</td>
                                            <td className="px-6 py-4">{item.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex">
                                <div>
                                    <p className="justify-start h-5 px-4 text-gray-500">Showing {indexOfFirstPayment + 1}-{Math.min(indexOfLastPayment, data.length)} of {data.length} results</p>
                                </div>
                                <div className="flex justify-end px-48">
                                    <nav className="flex items-center space-x-20">
                                        <button
                                            className="px-4 py-2 text-white bg-gray-800 hover:bg-gray-700"
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            Prev
                                        </button>
                                        <button
                                            className="px-4 py-2 text-white bg-gray-800 hover:bg-gray-700"
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === Math.ceil(data.length / paymentsPerPage)}
                                        >
                                            Next
                                        </button>
                                    </nav>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}