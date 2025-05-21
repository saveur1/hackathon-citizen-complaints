export interface Complaint {
    id: string;
    title: string;
    description: string;
    location: string;
    status?: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
    category?: string;
    handledBy: string;
    createdAt: string;
    updatedAt: string;
    userId?: string;
} 