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
                                <input
                                    type="text"
                                    className="w-full p-2 mt-4 border border-gray-300"
                                    placeholder="Search by Diagnosis Name"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
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