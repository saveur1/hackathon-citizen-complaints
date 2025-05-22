import React, { useState } from 'react';
import { useComplaints } from '@/Context/complaints-context';
import { FaSearch, FaBuilding, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaExclamationTriangle } from 'react-icons/fa';
import { Complaint } from '@/types/complaint';
import HomeHeader from '@/components/layouts/home-header';
import { useUser } from '@/Context/user-context';

const TrackTicketPage = () => {
    const { complaints, loading } = useComplaints();
    const [searchTerm, setSearchTerm] = useState('');

    const getStatusColor = (status: Complaint['status']) => {
        switch (status) {
            case 'SUBMITTED':
                return 'bg-gray-100 text-gray-800';
            case 'UNDER_REVIEW':
                return 'bg-yellow-100 text-yellow-800';
            case 'IN_PROGRESS':
                return 'bg-blue-100 text-blue-800';
            case 'RESOLVED':
                return 'bg-green-100 text-green-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            case 'ESCALATED':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredComplaints = complaints?.filter(complaint => {
        const matchesSearch = 
            complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            complaint.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesSearch;
    });

    if (loading) {
        return (
            <>
                <HomeHeader />
                <div className="flex h-[calc(100vh-64px)] items-center justify-center">
                    <div className="text-center">
                        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-lg text-gray-600">Loading your tickets...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <HomeHeader />
            <div className="min-h-[calc(100vh-64px)] bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Track Your Complaints</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Monitor the status and progress of your submitted complaints.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative max-w-md w-full">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search your complaints..."
                                className="block w-full rounded-lg border-0 outline-none py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Tickets List */}
                    <div className="space-y-6">
                        {filteredComplaints?.map((complaint) => (
                            <div key={complaint._id} className="bg-white rounded-xl  border shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                                                    <FaExclamationTriangle className="h-6 w-6 text-red-600" />
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                                                <p className="mt-1 text-sm text-gray-600">{complaint.description}</p>
                                            </div>
                                        </div>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                                            {complaint.status?.replace('_', ' ')}
                                        </span>
                                    </div>

                                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        {/* Location */}
                                        <div className="flex items-start">
                                            <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Location</p>
                                                <p className="text-sm text-gray-900">{complaint.location}</p>
                                            </div>
                                        </div>

                                        {/* Submitted Date */}
                                        <div className="flex items-start">
                                            <FaCalendarAlt className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Submitted On</p>
                                                <p className="text-sm text-gray-900">
                                                    {new Date(complaint.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Handled By */}
                                        <div className="flex items-start">
                                            <FaBuilding className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Handled By</p>
                                                <p className="text-sm text-gray-900">
                                                    {(complaint.handledBy as any)?.name || 'Not Assigned'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Submitted By */}
                                        <div className="flex items-start">
                                            <FaUser className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Submitted By</p>
                                                <p className="text-sm text-gray-900">
                                                    {(complaint.submittedBy as any)?.name || 'Anonymous'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Last Updated */}
                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <p className="text-xs text-gray-500">
                                            Last updated: {new Date(complaint.updatedAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredComplaints?.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                                <FaExclamationTriangle className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No complaints found</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Try adjusting your search or submit a new complaint.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrackTicketPage; 