import { z } from "zod"
import { UserRole } from "@/utils/enums"

export const createUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.nativeEnum(UserRole).optional(),
})

export const loginUserSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

export const updateUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(8, "Password must be at least 8 characters").optional(),
    role: z.nativeEnum(UserRole).optional(),
})

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
})

export const resetPasswordSchema = z.object({
    token: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginUserInput = z.infer<typeof loginUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
