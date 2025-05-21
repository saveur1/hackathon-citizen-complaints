import React, { useState } from 'react';
import { useAgencies } from '@/Context/agencies-context';
import { FaBuilding, FaPlus, FaSearch } from 'react-icons/fa';

const AgenciesPage = () => {
    const { agencies, loading } = useAgencies();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAgencies = agencies?.filter(agency =>
        agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agency.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center">
                    <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading agencies...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Agencies</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage and view all government agencies in the system.
                </p>
            </div>

            {/* Search and Add Agency */}
            <div className="mb-6 flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search agencies..."
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <button
                    onClick={() => {/* TODO: Implement add agency modal */}}
                    className="ml-4 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <FaPlus className="mr-2 h-4 w-4" />
                    Add Agency
                </button>
            </div>

            {/* Agencies Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAgencies?.map((agency) => (
                    <div
                        key={agency.id}
                        className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex h-48 flex-shrink-0 items-center justify-center bg-gray-100">
                            <FaBuilding className="h-16 w-16 text-gray-400" />
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{agency.name}</h3>
                                <p className="mt-2 text-sm text-gray-500">{agency.description}</p>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    {agency?.complaints?.length || 0} complaints
                                </div>
                                <button
                                    onClick={() => {/* TODO: Implement view agency details */}}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgenciesPage; 