import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/user'
import { API_URL } from '../config/constants'

interface UserContextType {
    user: User | null
    loading: boolean
    error: string | null
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
    forgotPassword: (email: string) => Promise<void>
    resetPassword: (token: string, password: string) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true) // Start with loading true
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Check if user is logged in on mount
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token')
                if (token) {
                    const response = await fetch(`${API_URL}/auth/me`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if (response.ok) {
                        const userData = await response.json()
                        setUser(userData.data.user)
                        
                        // Only redirect non-admin users trying to access dashboard
                        const currentPath = window.location.pathname
                        if (userData.data.user.role !== 'ADMIN' && currentPath.includes('/dashboard')) {
                            navigate('/')
                        }
                    } else {
                        localStorage.removeItem('token')
                        setUser(null)
                        if (window.location.pathname.includes('/dashboard')) {
                            navigate('/login')
                        }
                    }
                } else {
                    setUser(null)
                    if (window.location.pathname.includes('/dashboard')) {
                        navigate('/login')
                    }
                }
            } catch (err) {
                console.error('Auth check error:', err)
                setUser(null)
                if (window.location.pathname.includes('/dashboard')) {
                    navigate('/login')
                }
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [navigate])

    const login = async (email: string, password: string) => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Login failed')
            }

            localStorage.setItem('token', data.token)
            setUser(data.data.user)
            
            // Navigate based on user role
            if (data.data.user.role === 'ADMIN') {
                navigate('/dashboard')
            } else {
                navigate('/')
            }
        } catch (err: any) {
            setError(err.message || 'Login failed')
            throw err
        } finally {
            setLoading(false)
        }
    }

    const register = async (name: string, email: string, password: string) => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed')
            }

            localStorage.setItem('token', data.token)
            setUser(data.user)
            navigate('/dashboard')
        } catch (err: any) {
            setError(err.message || 'Registration failed')
            throw err
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/login')
    }

    const forgotPassword = async (email: string) => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(`${API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to process forgot password request')
            }
        } catch (err: any) {
            setError(err.message || 'Failed to process forgot password request')
            throw err
        } finally {
            setLoading(false)
        }
    }

    const resetPassword = async (token: string, password: string) => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(`${API_URL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to reset password')
            }
        } catch (err: any) {
            setError(err.message || 'Failed to reset password')
            throw err
        } finally {
            setLoading(false)
        }
    }

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
} 