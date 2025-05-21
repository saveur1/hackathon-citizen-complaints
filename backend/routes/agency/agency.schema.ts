import { z } from "zod"

export const createAgencySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    contactEmail: z.string().email("Invalid email address"),
    serviceCategories: z.array(z.string()).min(1, "At least one service category is required"),
})

export const updateAgencySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    description: z.string().min(10, "Description must be at least 10 characters").optional(),
    contactEmail: z.string().email("Invalid email address").optional(),
    serviceCategories: z.array(z.string()).min(1, "At least one service category is required").optional(),
})

export type CreateAgencyInput = z.infer<typeof createAgencySchema>
export type UpdateAgencyInput = z.infer<typeof updateAgencySchema>
