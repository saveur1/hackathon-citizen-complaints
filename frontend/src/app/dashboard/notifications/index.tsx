import React, { useState } from 'react';
import { FaBell, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

interface Notification {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message: string;
    time: string;
    read: boolean;
}

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            type: 'success',
            title: 'Complaint Resolved',
            message: 'Your complaint about road maintenance has been resolved.',
            time: '2 hours ago',
            read: false
        },
        {
            id: '2',
            type: 'error',
            title: 'Complaint Rejected',
            message: 'Your complaint about water supply has been rejected due to insufficient information.',
            time: '5 hours ago',
            read: false
        },
        {
            id: '3',
            type: 'info',
            title: 'New Update',
            message: 'A new agency has been added to handle environmental complaints.',
            time: '1 day ago',
            read: true
        },
        {
            id: '4',
            type: 'warning',
            title: 'Action Required',
            message: 'Please provide additional information for your pending complaint.',
            time: '2 days ago',
            read: true
        }
    ]);

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return <FaCheckCircle className="h-6 w-6 text-green-500" />;
            case 'error':
                return <FaExclamationCircle className="h-6 w-6 text-red-500" />;
            case 'info':
                return <FaInfoCircle className="h-6 w-6 text-blue-500" />;
            case 'warning':
                return <FaExclamationCircle className="h-6 w-6 text-yellow-500" />;
        }
    };

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Stay updated with the latest activities and updates.
                        </p>
                    </div>
                    <button
                        onClick={markAllAsRead}
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <FaCheckCircle className="mr-2 h-4 w-4 text-gray-400" />
                        Mark all as read
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
                {notifications.length === 0 ? (
                    <div className="p-6 text-center">
                        <FaBell className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            You're all caught up! Check back later for new updates.
                        </p>
                    </div>
                ) : (
                    <ul role="list" className="divide-y divide-gray-200">
                        {notifications.map((notification) => (
                            <li
                                key={notification.id}
                                className={`p-6 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-900">
                                                {notification.title}
                                            </p>
                                            <p className="text-sm text-gray-500">{notification.time}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {notification.message}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <button
                                            onClick={() => markAsRead(notification.id)}
                                            className="ml-4 flex-shrink-0"
                                        >
                                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                New
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage; 