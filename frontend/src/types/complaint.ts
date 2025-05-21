export interface Complaint {
    submittedBy: any;
    _id: string;
    title: string;
    description: string;
    location: string;
    status?: 'SUBMITTED' | 'UNDER_REVIEW' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED' | 'ESCALATED';
    category?: string;
    handledBy: string;
    createdAt: string;
    updatedAt: string;
    userId?: string;
} 