import { Outlet } from 'react-router-dom'
import ProtectedRoute from './protected-route'
import { useUser } from '@/Context/user-context';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    FaBuilding, 
    FaExclamationTriangle, 
    FaBell, 
    FaUserCircle,
    FaSignOutAlt,
    FaUsers,
    FaSearch
} from 'react-icons/fa';
import { AgenciesProvider } from '@/Context/agencies-context';
import { ComplaintsProvider } from '@/Context/complaints-context';

const DashboardLayout = () => {
    const { logout, user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const navigationItems = [
        {
            title: 'Dashboard',
            icon: FaBuilding,
            path: '/dashboard',
            color: 'text-blue-600'
        },
        {
            title: 'Users',
            icon: FaUsers,
            path: '/dashboard/users',
            color: 'text-purple-600'
        },
        {
            title: 'Agencies',
            icon: FaBuilding,
            path: '/dashboard/agencies',
            color: 'text-blue-600'
        },
        {
            title: 'Complaints',
            icon: FaExclamationTriangle,
            path: '/dashboard/complaints',
            color: 'text-red-600'
        },
        {
            title: 'Notifications',
            icon: FaBell,
            path: '/dashboard/notifications',
            color: 'text-yellow-600'
        },
        {
            title: 'Profile',
            icon: FaUserCircle,
            path: '/dashboard/profile',
            color: 'text-green-600'
        }
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <AgenciesProvider>
                <ComplaintsProvider>
                    <div className="min-h-screen bg-gray-50 overflow-hidden">
                        {/* Sidebar */}
                        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
                            <div className="flex h-16 items-center justify-center border-b">
                                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                            </div>
                            <nav className="mt-5 px-2">
                                <div className="space-y-1">
                                    {navigationItems.map((item) => {
                                        const isActive = location.pathname === item.path;
                                        return (
                                            <button
                                                key={item.title}
                                                onClick={() => navigate(item.path)}
                                                className={`group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium ${
                                                    isActive
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                            >
                                                <item.icon
                                                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                                                        isActive ? item.color : 'text-gray-400 group-hover:text-gray-500'
                                                    }`}
                                                />
                                                {item.title}
                                            </button>
                                        );
                                    })}
                                </div>
                            </nav>
                            <div className="absolute bottom-0 w-full border-t p-4">
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    <FaSignOutAlt className="mr-3 h-5 w-5 text-gray-400" />
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="pl-64 h-screen">
                            {/* Header */}
                            <header className="sticky top-0 z-10 bg-white border-b">
                                <div className="flex h-16 items-center justify-between px-6">
                                    {/* Search */}
                                    <div className="flex-1 max-w-lg">
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <FaSearch className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    {/* Right side icons */}
                                    <div className="flex items-center space-x-4">
                                        {/* Notifications */}
                                        <button
                                            onClick={() => navigate('/dashboard/notifications')}
                                            className="relative rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <FaBell className="h-6 w-6" />
                                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                                        </button>

                                        {/* Profile dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() => navigate('/dashboard/profile')}
                                                className="flex items-center space-x-3 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                <span className="sr-only">Open user menu</span>
                                                {user?.profilePicture ? (
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={user.profilePicture}
                                                        alt={user.name}
                                                    />
                                                ) : (
                                                    <FaUserCircle className="h-8 w-8 text-gray-400" />
                                                )}
                                                <div className="hidden md:block text-left">
                                                    <p className="text-sm font-medium text-gray-700">
                                                        {user?.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {user?.role}
                                                    </p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            <main className="h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50 p-6">
                                <Outlet />
                            </main>
                        </div>
                    </div>
                </ComplaintsProvider>
            </AgenciesProvider>
        </ProtectedRoute>
    );
};

export default DashboardLayout; 
