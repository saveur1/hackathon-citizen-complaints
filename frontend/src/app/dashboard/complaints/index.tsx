import React, { useState } from 'react';
import { useComplaints } from '@/Context/complaints-context';
import { FaExclamationTriangle, FaSearch } from 'react-icons/fa';
import { Complaint } from '@/types/complaint';

const ComplaintsPage = () => {
    const { complaints, loading, updateComplaintStatus } = useComplaints();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<Complaint['status'] | 'ALL'>('ALL');

    const filteredComplaints = complaints?.filter(complaint => {
        const matchesSearch = 
            complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            complaint.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'ALL' || complaint.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center">
                    <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading complaints...</p>
                </div>
            </div>
        );
    }

    const getStatusColor = (status: Complaint['status']) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'IN_PROGRESS':
                return 'bg-blue-100 text-blue-800';
            case 'RESOLVED':
                return 'bg-green-100 text-green-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Complaints</h1>
                <p className="mt-1 text-sm text-gray-500">
                    View and manage all complaints in the system.
                </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-6 flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search complaints..."
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as Complaint['status'] | 'ALL')}
                    className="ml-4 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="REJECTED">Rejected</option>
                </select>
            </div>

            {/* Complaints List */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <ul role="list" className="divide-y divide-gray-200">
                    {filteredComplaints?.map((complaint) => (
                        <li key={complaint.id} className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                                            <FaExclamationTriangle className="h-6 w-6 text-red-600" />
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{complaint.title}</h3>
                                        <p className="mt-1 text-sm text-gray-500">{complaint.description}</p>
                                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                            <span>{complaint.location}</span>
                                            <span>•</span>
                                            <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(complaint.status)}`}>
                                        {complaint.status.replace('_', ' ')}
                                    </span>
                                    <select
                                        value={complaint.status}
                                        onChange={(e) => updateComplaintStatus(complaint.id, e.target.value as Complaint['status'])}
                                        className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="RESOLVED">Resolved</option>
                                        <option value="REJECTED">Rejected</option>
                                    </select>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ComplaintsPage; 