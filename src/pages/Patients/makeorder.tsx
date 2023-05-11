import React, { useEffect, useState, } from "react";
import Sidebar from "./Components/sidebar";
import { axiosInstance } from "../common/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router';


interface MedicineLists {
    id: number;
    medicineName: string;
    price: number;
    medicineGroup: string;
    status: string;
    quantity: number; // Add quantity property
}
export default function SearchMedicine() {
    const [medicineLists, setmedicineLists] = useState<MedicineLists[]>([]);
    const [filteredLists, setfilteredLists] = useState<MedicineLists[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [medPerPage] = useState(15); // Number of Listss to display per page
    const [cartItems, setCartItems] = useState<MedicineLists[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const router = useRouter();



    useEffect(() => {
        // Fetch diagnosis Listss data from API and set to state
        if (typeof sessionStorage === "undefined") {
            alert("Please login to continue");
            router.push('Patients/login');
        }


        axiosInstance.get('patients/medicinelist')
            .then(response => {
                setmedicineLists(response.data);
                setfilteredLists(response.data);
            })
            .catch(error => {
                console.error('Error fetching diagnosis Listss:', error);
            });
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        // Filter diagnosis Listss based on search term
        const filtered = medicineLists.filter(Lists =>
            Lists.medicineName.toLowerCase().includes(term.toLowerCase())
        );
        setfilteredLists(filtered);
    };

    const addToCart = (medicine: string, quantity: number, price: number) => {
        const newItem: MedicineLists = {
            id: 1, // generate a unique ID for the item
            medicineName: medicine,
            quantity: quantity,
            price: quantity * price, // provide the appropriate price value
            medicineGroup: '', // provide the appropriate medicine group value
            status: '', // provide the appropriate status value
        };

        console.log(quantity);

        setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    };

    const handleCartClick = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleCheckout = (cartItems: MedicineLists[]) => {
        const userid = sessionStorage.getItem('userid');
        // Perform any necessary actions before navigating to the next page
        if (!userid) {
            alert("Please login to continue");
            return;
        }
        //const citems = JSON.stringify(cartItems);
        // For example, you can store the cart details in localStorage or pass them as query parameters in the URL

        // Redirect to the "order-checkout" page with the cart details
        router.push({
            pathname: `/Patients/order-checkout/${userid}`,
            query: { cartItems: JSON.stringify(cartItems) }
        });

    };

    // Get current Listss based on current page
    const indexOfLastLists = currentPage * medPerPage;
    const indexOfFirstLists = indexOfLastLists - medPerPage;
    const currentLists = filteredLists.slice(indexOfFirstLists, indexOfLastLists);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return (
        <>
            <div className="grid grid-cols-12 ">


                <Sidebar />


                <div className="col-span-9">
                    <div className="container flex flex-col min-h-screen mx-auto ">
                        <div className="fixed top-6 right-6">
                            <div className="relative">
                                <button
                                    className="relative z-50 p-2 text-gray-800 shadow hover:bg-gray-200 focus:outline-none"
                                    onClick={handleCartClick}
                                >
                                    <FontAwesomeIcon icon={faShoppingCart} size="lg" className="text-2xl text-gray-500 cursor-pointer" />
                                    <span className="ml-1 text-sm text-gray-500">
                                        {cartItems.length}
                                    </span>
                                </button>
                                {cartItems.length > 0 && isCartOpen && (
                                    <div className="absolute right-0 z-10 w-56 mt-2 bg-white border rounded-md shadow-lg">
                                        <div className="p-8">
                                            <h2 className="text-xl font-semibold">Cart Items</h2>
                                            <ul className="mt-4 space-y-2">
                                                {cartItems.map((item, index) => (
                                                    <li key={index}>
                                                        {item.medicineName} (Quantity: {item.quantity}) -  Tk {item.price}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button
                                                className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                onClick={() => handleCheckout(cartItems)}
                                            >
                                                Checkout
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                        <h1 className="px-4 text-3xl font-semibold">Medicine Order Service</h1>





                        <div className="flex-1">
                            <div className="p-4">
                                <form>
                                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative flex items-center">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </div>
                                        <input type="search" id="search" className="block w-2/3 p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by medicine name" value={searchTerm}
                                            onChange={handleSearch} required />
                                        <button type="submit" className=" right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Search</button>
                                    </div>
                                </form>
                                <table className="w-full my-2 text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-t-md">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">ID</th>
                                            <th scope="col" className="px-6 py-3">Medicine Name</th>
                                            <th scope="col" className="px-6 py-3">Medicine Group</th>
                                            <th scope="col" className="px-6 py-3">Price (tk)</th>
                                            <th scope="col" className="px-6 py-3">Status</th>

                                            <th scope="col" className="px-6 py-3">Quantity(Pcs)</th>
                                            <th scope="col" className="px-6 py-3">Add to Cart</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentLists.map(Lists => (
                                            <tr key={Lists.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">{Lists.id}</td>
                                                <td className="px-6 py-4">{Lists.medicineName}</td>
                                                <td className="px-6 py-4">{Lists.medicineGroup}</td>
                                                <td className="px-6 py-4">{Lists.price} </td>
                                                <td className="px-6 py-4">{Lists.status}</td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={Lists.quantity}
                                                        className="block w-20 px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        onChange={(e) => {
                                                            const quantity = parseInt(e.target.value, 10);

                                                            const updatedLists = currentLists.map((item) => {
                                                                if (item.id === Lists.id) {
                                                                    return {
                                                                        ...item,
                                                                        quantity: quantity,
                                                                    };
                                                                }
                                                                return item;
                                                            });
                                                            setfilteredLists(updatedLists);
                                                        }}

                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="px-2 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                        onClick={() => addToCart(Lists.medicineName, Lists.quantity, Lists.price)}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex">
                                <div>
                                    <p className="justify-start h-5 px-4 text-gray-500">Showing {indexOfFirstLists + 1}-{Math.min(indexOfLastLists, filteredLists.length)} of {filteredLists.length} results</p>
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
                                            disabled={currentPage === Math.ceil(filteredLists.length / medPerPage)}
                                        >
                                            Next
                                        </button>
                                    </nav>
                                </div>
                            </div>

                        </div>
                    </div></div>




            </div>

        </>
    )
}

