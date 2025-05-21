import { Outlet } from "react-router-dom";
import ProtectedRoute from './protected-route';

const UserDashboardLayout = () => {
  return (
    <ProtectedRoute allowedRoles={['admin', 'responder']}>
        <Outlet />
    </ProtectedRoute>
  )
}

export default UserDashboardLayout;