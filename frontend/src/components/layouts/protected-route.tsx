// components/ProtectedRoute.tsx
import { useUser } from '@/Context/user-context'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedProps {
    children: ReactNode
    allowedRoles: string[]
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedProps) => {
    const { user, loading } = useUser()

    // Wait until auth state is loaded
    if (loading) {
        return <div className="text-center py-8">Loading...</div>
    }

    if (user && allowedRoles.includes(user.role.toLowerCase())) {
        return children
    }

    return <Navigate to="/login" />
}

export default ProtectedRoute
