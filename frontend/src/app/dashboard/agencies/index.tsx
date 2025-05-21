import React, { useState } from 'react';
import { useAgencies } from '@/Context/agencies-context';
import { useComplaints } from '@/Context/complaints-context';
import { FaBuilding, FaPlus, FaSearch, FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { API_URL } from '@/config/constants';

interface AgencyFormData {
    name: string;
    description: string;
    contactEmail: string;
    serviceList: string; // This is for the form input
}

interface AgencySubmitData {
    name: string;
    description: string;
    contactEmail: string;
    serviceCategories: string[];
}

const AgenciesPage = () => {
    const { agencies, fetchAgencies, loading } = useAgencies();
    const { complaints } = useComplaints();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedAgency, setSelectedAgency] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const agenciesPerPage = 9;
    const [formData, setFormData] = useState<AgencyFormData>({
        name: '',
        description: '',
        contactEmail: '',
        serviceList: ''
    });
    const [formError, setFormError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setFormError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setFormError(null);
            const token = localStorage.getItem('token');
            const url = selectedAgency 
                ? `${API_URL}/agencies/${selectedAgency._id}`
                : `${API_URL}/agencies`;
            
            // Convert form data to API format
            const submitData: AgencySubmitData = {
                name: formData.name,
                description: formData.description,
                contactEmail: formData.contactEmail,
                serviceCategories: formData.serviceList
                    .split(',')
                    .map(service => service.trim())
                    .filter(service => service.length > 0)
            };
            
            const response = await fetch(url, {
                method: selectedAgency ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(submitData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save agency');
            }

            // Refresh agencies list
            await fetchAgencies();
            handleCloseModal();
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    const handleEdit = (agency: any) => {
        setSelectedAgency(agency);
        setFormData({
            name: agency.name,
            description: agency.description,
            contactEmail: agency.contactEmail,
            serviceList: agency.serviceCategories?.join(', ') || ''
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAgency(null);
        setFormData({
            name: '',
            description: '',
            contactEmail: '',
            serviceList: ''
        });
        setFormError(null);
    };

    const handleView = (agency: any) => {
        setSelectedAgency(agency);
        setIsViewModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedAgency(null);
    };

    const handleDelete = async (agencyId: string) => {
        if (!window.confirm('Are you sure you want to delete this agency? This action cannot be undone.')) {
            return;
        }

        try {
            setIsDeleting(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/agencies/${agencyId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete agency');
            }

            await fetchAgencies();
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredAgencies = agencies?.filter(agency =>
        agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agency.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastAgency = currentPage * agenciesPerPage;
    const indexOfFirstAgency = indexOfLastAgency - agenciesPerPage;
    const currentAgencies = filteredAgencies?.slice(indexOfFirstAgency, indexOfLastAgency);
    const totalPages = Math.ceil((filteredAgencies?.length || 0) / agenciesPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getAgencyComplaintsCount = (agencyId: string) => {
        return complaints.filter(complaint => (complaint.handledBy as any)._id === agencyId).length;
    };

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
                    onClick={() => setIsModalOpen(true)}
                    className="ml-4 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <FaPlus className="mr-2 h-4 w-4" />
                    Add Agency
                </button>
            </div>

            {/* Agencies Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentAgencies?.map((agency) => (
                    <div
                        key={agency._id}
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
                                    {getAgencyComplaintsCount(agency._id)} complaints
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleView(agency)}
                                        className="text-amber-600 hover:text-amber-500"
                                        title="View Details"
                                    >
                                        <FaEye className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleEdit(agency)}
                                        className="text-blue-600 hover:text-blue-500"
                                        title="Edit Agency"
                                    >
                                        <FaEdit className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(agency._id)}
                                        disabled={isDeleting}
                                        className="text-red-600 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Delete Agency"
                                    >
                                        <FaTrash className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-3 py-1 rounded-md text-sm font-medium ${
                                    currentPage === index + 1
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </nav>
                </div>
            )}

            {/* View Agency Modal */}
            {isViewModalOpen && selectedAgency && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-10 max-w-2xl w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Agency Details
                            </h2>
                            <button
                                onClick={handleCloseViewModal}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                                <p className="mt-1 text-lg text-gray-900">{selectedAgency.name}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                                <p className="mt-1 text-lg text-gray-900">{selectedAgency.description}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Contact Email</h3>
                                <p className="mt-1 text-lg text-gray-900">{selectedAgency.contactEmail}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Service Categories</h3>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {selectedAgency.serviceCategories?.map((service: string, index: number) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Complaints</h3>
                                <div className="mt-2">
                                    <p className="text-lg text-gray-900">
                                        Total Complaints: {getAgencyComplaintsCount(selectedAgency._id)}
                                    </p>
                                    <div className="mt-4 space-y-3">
                                        {complaints
                                            .filter(complaint => (complaint.handledBy as any)._id === selectedAgency._id)
                                            .slice(0, 3)
                                            .map(complaint => (
                                                <div key={complaint.id} className="bg-gray-100 p-3 rounded-lg">
                                                    <p className="text-sm font-medium text-gray-900">{complaint.title}</p>
                                                    <p className="text-sm text-gray-500 mt-1">{complaint.description}</p>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            complaint.status === 'SUBMITTED' ? 'bg-gray-100 text-gray-800' :
                                                            complaint.status === 'UNDER_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                                                            complaint.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                                                            complaint.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                                                            complaint.status === 'ESCALATED' ? 'bg-purple-100 text-purple-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                            {complaint.status?.replace('_', ' ')}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(complaint.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Agency Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-10 max-w-2xl w-full">
                        <h2 className="text-lg font-medium mb-4">
                            {selectedAgency ? 'Edit Agency' : 'Add New Agency'}
                        </h2>
                        {formError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-sm text-red-600">{formError}</p>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full rounded border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Service Categories
                                </label>
                                <textarea
                                    name="serviceList"
                                    value={formData.serviceList}
                                    onChange={handleInputChange}
                                    placeholder="Enter services separated by commas (e.g., Service 1, Service 2, Service 3)"
                                    rows={3}
                                    className="mt-1 block w-full rounded border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none"
                                    required
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    List all services offered by this agency, separated by commas
                                </p>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    {selectedAgency ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgenciesPage; 