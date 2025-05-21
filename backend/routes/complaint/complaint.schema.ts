import { z } from "zod"
import { ComplaintStatus } from "@/utils/enums"

export const createComplaintSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    location: z.string().min(3, "Location must be at least 3 characters"),
    handledBy: z.string().optional(),
})

export const updateComplaintSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters").optional(),
    description: z.string().min(10, "Description must be at least 10 characters").optional(),
    location: z.string().min(3, "Location must be at least 3 characters").optional(),
    status: z.nativeEnum(ComplaintStatus).optional(),
    handledBy: z.string().optional(),
})

export type CreateComplaintInput = z.infer<typeof createComplaintSchema>
export type UpdateComplaintInput = z.infer<typeof updateComplaintSchema>
