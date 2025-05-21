import React, { createContext, useContext, useState, useEffect } from 'react'
import { API_URL } from '@/config/constants'

interface Agency {
    _id: string
    name: string
    description: string
    email: string
    phone: string
    address: string
    category: string
    createdAt: string
    updatedAt: string
}

interface AgenciesContextType {
    agencies: Agency[]
    loading: boolean
    error: string | null
    fetchAgencies: () => Promise<void>
    getAgencyById: (id: string) => Agency | undefined
}

const AgenciesContext = createContext<AgenciesContextType | undefined>(undefined)

export const AgenciesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [agencies, setAgencies] = useState<Agency[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchAgencies = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/agencies`)
            if (!response.ok) {
                throw new Error('Failed to fetch agencies')
            }
            const data = await response.json()
            setAgencies(data.data.agencies)
        } catch (err) {
            setError((err as Error)?.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const getAgencyById = (id: string) => {
        return agencies.find(agency => agency._id === id)
    }

    useEffect(() => {
        fetchAgencies()
    }, [])

    return (
        <AgenciesContext.Provider value={{
            agencies,
            loading,
            error,
            fetchAgencies,
            getAgencyById,
        }}>
            {children}
        </AgenciesContext.Provider>
    )
}

export const useAgencies = () => {
    const context = useContext(AgenciesContext)
    if (context === undefined) {
        throw new Error('useAgencies must be used within an AgenciesProvider')
    }
    return context
} 