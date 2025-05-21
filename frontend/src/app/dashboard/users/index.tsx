import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaEdit, FaTrash, FaUserCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { API_URL } from '@/config/constants';
import { User } from '@/types/user';

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'CITIZEN',
        password: ''
    });
    const [formError, setFormError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data.data.users);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setFormError(null);
            setLoading(true);
            const token = localStorage.getItem('token');
            const url = selectedUser 
                ? `${API_URL}/users/${selectedUser._id}`
                : `${API_URL}/auth/register`;
            
            const response = await fetch(url, {
                method: selectedUser ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save user');
            }

            await fetchUsers();
            setIsModalOpen(false);
            setSelectedUser(null);
            setFormData({
                name: '',
                email: '',
                role: 'CITIZEN',
                password: ''
            });
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            password: ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (userId: string) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            await fetchUsers();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormError(null);
        setSelectedUser(null);
        setFormData({
            name: '',
            email: '',
            role: 'CITIZEN',
            password: ''
        });
    };

    const filteredUsers = users.filter(user => {
        const searchLower = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower) ||
            user.role.toLowerCase().includes(searchLower)
        );
    });

    // Calculate pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center">
                    <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage system users and their roles.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setSelectedUser(null);
                            setFormData({
                                name: '',
                                email: '',
                                role: 'CITIZEN',
                                password: ''
                            });
                            setIsModalOpen(true);
                        }}
                        className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        <FaUserPlus className="mr-2 h-4 w-4" />
                        Add User
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative flex-1 max-w-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name, email or role..."
                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 outline-none sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentUsers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No users found matching your search
                                </td>
                            </tr>
                        ) : (
                            currentUsers.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {user.profilePicture ? (
                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src={user.profilePicture}
                                                        alt={user.name}
                                                    />
                                                ) : (
                                                    <FaUserCircle className="h-10 w-10 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                                            user.role === 'AGENCY_STAFF' ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            <FaEdit className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <FaTrash className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4 rounded-lg shadow">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
                                <span className="font-medium">
                                    {Math.min(indexOfLastUser, filteredUsers.length)}
                                </span>{' '}
                                of <span className="font-medium">{filteredUsers.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Previous</span>
                                    <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                            currentPage === index + 1
                                                ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Next</span>
                                    <FaChevronRight className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-10 max-w-md w-full">
                        <h2 className="text-lg font-medium mb-4">
                            {selectedUser ? 'Edit User' : 'Add New User'}
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
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none"
                                >
                                    <option value="CITIZEN">Citizen</option>
                                    <option value="AGENCY_STAFF">Agency Staff</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                            {!selectedUser && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none"
                                        required={!selectedUser}
                                    />
                                </div>
                            )}
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
                                    {selectedUser ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage; 