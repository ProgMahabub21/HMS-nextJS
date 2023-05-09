import React, { useState, useEffect } from "react";
import Sidebar from "./Components/sidebar";
import axios from 'axios';

interface DiagnosisTest {
    id: number;
    diagnosisCategory: string;
    diagnosisName: string;
    price: string;
}
export default function SearchDiagnosis() {
    const [diagnosisTests, setDiagnosisTests] = useState<DiagnosisTest[]>([]);
    const [filteredTests, setFilteredTests] = useState<DiagnosisTest[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [testsPerPage] = useState(15); // Number of tests to display per page

    useEffect(() => {
        // Fetch diagnosis tests data from API and set to state
        axios.get('http://localhost:3000/patients/diagnosis')
            .then(response => {
                setDiagnosisTests(response.data);
                setFilteredTests(response.data);
            })
            .catch(error => {
                console.error('Error fetching diagnosis tests:', error);
            });
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        // Filter diagnosis tests based on search term
        const filtered = diagnosisTests.filter(test =>
            test.diagnosisName.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredTests(filtered);
    };

    // Get current tests based on current page
    const indexOfLastTest = currentPage * testsPerPage;
    const indexOfFirstTest = indexOfLastTest - testsPerPage;
    const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <>
            <div className="grid grid-cols-12 mx-auto ">
                <Sidebar />
                <div className="col-span-9">
                    <div className="container flex flex-col min-h-screen mx-auto">

                        <h1 className="px-4 text-3xl font-semibold">Diagnosis Test List</h1>

                        <div className="flex-1">
                            <div className="p-4">
                                <form>
                                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </div>
                                        <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by test name" value={searchTerm}
                                            onChange={handleSearch} required />
                                        <button type="submit"  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                    </div>
                                </form>
                                <table className="w-full mt-4 table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">ID</th>
                                            <th className="px-4 py-2">Category</th>
                                            <th className="px-4 py-2">Diagnosis Name</th>
                                            <th className="px-4 py-2">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentTests.map(test => (
                                            <tr key={test.id}>
                                                <td className="px-4 py-2">{test.id}</td>
                                                <td className="px-4 py-2">{test.diagnosisCategory}</td>
                                                <td className="px-4 py-2">{test.diagnosisName}</td>
                                                <td className="px-4 py-2">{test.price} tk</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex">
                                <div>
                                    <p className="justify-start h-5 px-4 text-gray-500">Showing {indexOfFirstTest + 1}-{Math.min(indexOfLastTest, filteredTests.length)} of {filteredTests.length} results</p>
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
                                            disabled={currentPage === Math.ceil(filteredTests.length / testsPerPage)}
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
    );

}