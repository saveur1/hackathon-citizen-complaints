import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgencies } from '@/Context/agencies-context';
import { useComplaints } from '@/Context/complaints-context';
import { FaBuilding, FaExclamationTriangle, FaBell, FaUserCircle } from 'react-icons/fa';
import { Complaint } from '@/types/complaint';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { agencies, loading: agenciesLoading } = useAgencies();
    const { complaints, loading: complaintsLoading } = useComplaints();

    const stats = [
        {
            name: 'Total Agencies',
            value: agencies?.length || 0,
            icon: FaBuilding,
            color: 'bg-blue-500',
            path: '/dashboard/agencies'
        },
        {
            name: 'Total Complaints',
            value: complaints?.length || 0,
            icon: FaExclamationTriangle,
            color: 'bg-red-500',
            path: '/dashboard/complaints'
        },
        {
            name: 'Notifications',
            value: '3', // This should come from your notifications context
            icon: FaBell,
            color: 'bg-yellow-500',
            path: '/dashboard/notifications'
        },
        {
            name: 'Profile',
            value: 'View',
            icon: FaUserCircle,
            color: 'bg-green-500',
            path: '/dashboard/profile'
        }
    ];

    if (agenciesLoading || complaintsLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center">
                    <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Welcome to your admin dashboard. Here's an overview of your system.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        onClick={() => navigate(stat.path)}
                        className="relative cursor-pointer overflow-hidden rounded-lg bg-white px-4 py-5 shadow hover:shadow-md transition-shadow duration-200"
                    >
                        <dt>
                            <div className={`absolute rounded-md p-3 ${stat.color}`}>
                                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline">
                            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                        </dd>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                        <div className="flow-root">
                            <ul role="list" className="-mb-8">
                                {complaints?.slice(0, 4).map((complaint: Complaint, index: number) => (
                                    <li key={complaint._id}>
                                        <div className="relative pb-8">
                                            {index !== complaints.length - 1 && (
                                                <span
                                                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                                                        <FaExclamationTriangle className="h-5 w-5 text-white" />
                                                    </span>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div>
                                                        <div className="text-sm text-gray-500">
                                                            <span className="font-medium text-gray-900">
                                                                {complaint.title}
                                                            </span>
                                                            {' - '}
                                                            <span className="whitespace-nowrap">
                                                                {new Date(complaint.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 text-sm text-gray-700">
                                                        <p>{complaint.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage; 