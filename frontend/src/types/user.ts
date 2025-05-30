export interface User {
    _id: string | null | undefined
    id: string
    name: string
    email: string
    role: 'CITIZEN' | 'ADMIN' | 'AGENCY_STAFF'
    profilePicture?: string
    agencyId?: string
    createdAt: string
    updatedAt: string
    profile?: {
        phone?: string
        address?: string
        city?: string
        state?: string
        zipCode?: string
    }
} 