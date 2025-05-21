import { z } from "zod"

export const createResponseSchema = z.object({
  message: z.string().min(1, "Message is required"),
  internalNotes: z.string().optional(),
  complaint: z.string(),
})

export type CreateResponseInput = z.infer<typeof createResponseSchema>
