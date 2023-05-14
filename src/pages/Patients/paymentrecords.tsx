import React, { useEffect, useState } from "react";
import Sidebar from "./Components/sidebar";
import { axiosInstance } from "@/common/axios";
import SessionCheck from "./Components/sessionCheck";



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
    const [selectedTransactionId, setSelectedTransactionId] = useState("");
    const [lineItems, setLineItems] = useState([]);
    const [showPopover, setShowPopover] = useState(false);

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
                console.log("fetched data", data);
            } catch (error) {
                console.log("Error fetching payment records:", error);
            }
        };

        fetchData();
    }, []);

    const handleViewDetails = async (transactionId: string) => {
        setSelectedTransactionId(transactionId);
        console.log(selectedTransactionId);
        setShowPopover(true);
        // Make API call to retrieve line items for the transaction ID
        // Replace the API endpoint below with the actual endpoint
        const Stripe = require('stripe');
        const stripe = Stripe('sk_test_51N6KAlDVaqngytN0P2fbU2rv9HpZx55S0zfa9a88pzGmixwg6MZs0ay4gp12x6Mga6u2NxDtmRI2AeaMADikB5vM00u9Cqk2OQ');
        try {
            const rlineItems = await stripe.checkout.sessions.listLineItems(transactionId, { limit: 5 });
            console
            setLineItems(rlineItems.data);
            console.log(lineItems);
            setShowPopover(true);
        } catch (error) {
            // Handle error case
            console.log("Error fetching line items from stripe:", error);
        }
    };


    const handleClosePopover = () => {
        setShowPopover(false);
        setLineItems([]);
    };

    const formatAmount = (amount: any) => {
        return (amount / 100).toFixed(2); // Assuming the amount is in cents, dividing by 100 to get the amount in dollars and fixing it to 2 decimal places
    };

    return (
        <>
            <SessionCheck/>
            <div className="grid grid-cols-12">
                

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
                                            <td className="px-6 py-4">
                                                <button
                                                    className="text-blue-600 hover:underline"
                                                    onClick={() => handleViewDetails(item.transactionid)}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {showPopover && (
                                <div className="fixed inset-0 flex items-center justify-center ">
                                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                                    <div className="z-10 w-5/12 bg-white rounded-lg shadow-lg">
                                        <div className="flex items-center justify-between px-4 py-3 border-b">
                                            <h3 className="text-xl font-bold text-gray-900">
                                                Order Items Details
                                            </h3>
                                            <button
                                                className="text-gray-600 hover:text-gray-900"
                                                onClick={handleClosePopover}
                                            >
                                                <svg
                                                    className="w-6 h-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-2">
                                                {lineItems.map((item: any, index: number) => (
                                                    <li key={item.id}>
                                                        <p className="flex items-center space-x-2 font-medium">
                                                            <span className="font-bold">{index + 1}.</span>
                                                            <span className="font-bold">Medicine Name: </span>
                                                            <span className="w-24 italic">{item.description}</span> -
                                                            <span className="font-bold"> Quantity:  </span>
                                                            <span className="w-8"> ({item.quantity}) </span>
                                                            <span className="w-16 text-gray-500 whitespace-nowrap">
                                                                 Amount: <span className="font-semibold">{formatAmount(item.amount_total)}</span> ({item.currency})
                                                                
                                                            </span>
                                                        </p>

                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}





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

