import React, { createContext, useContext, useState, useEffect } from 'react';
import { Complaint } from '@/types/complaint';
import { API_URL } from '@/config/constants';

interface ComplaintsContextType {
    complaints: Complaint[];
    loading: boolean;
    error: string | null;
    submitComplaint: (complaintData: Omit<Complaint, '_id' | 'submittedBy' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateComplaintStatus: (id: string, status: Complaint['status']) => Promise<void>;
}

const ComplaintsContext = createContext<ComplaintsContextType | undefined>(undefined);

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

export const ComplaintsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchComplaints = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/complaints`, {
                headers: getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to fetch complaints');
            }
            const data = await response.json();
            setComplaints(data.data.complaints);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const submitComplaint = async (complaintData: Omit<Complaint, '_id' | 'submittedBy' | 'createdAt' | 'updatedAt'>) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/complaints`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(complaintData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit complaint');
            }

            const newComplaint = await response.json();
            setComplaints(prev => [...prev, newComplaint]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateComplaintStatus = async (id: string, status: Complaint['status']) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/complaints/${id}/status`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update complaint status');
            }

            const updatedComplaint = (await response.json()).data.complaint;
            setComplaints(prev =>
                prev.map(complaint =>
                    complaint._id === id ? updatedComplaint : complaint
                )
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <ComplaintsContext.Provider
            value={{
                complaints,
                loading,
                error,
                submitComplaint,
                updateComplaintStatus,
            }}
        >
            {children}
        </ComplaintsContext.Provider>
    );
};

export const useComplaints = () => {
    const context = useContext(ComplaintsContext);
    if (context === undefined) {
        throw new Error('useComplaints must be used within a ComplaintsProvider');
    }
    return context;
}; 