import { Router } from "express"
import { register, login, getMe, forgotPassword, resetPassword } from "@/routes/auth/auth.controller"
import { protect } from "@/middleware/auth.middleware"
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createApiReqestBody, createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { createUserSchema, loginUserSchema, forgotPasswordSchema, resetPasswordSchema } from "../user/user.schema";

const router = Router()
export const registry = new OpenAPIRegistry();

//REGISTRATION
registry.registerPath({
    method: "post",
    path: "/api/auth/register",
    description: "This route is for registering new user.",
    tags: ["Authentication"],
    request: {
        body: createApiReqestBody(createUserSchema),
    },
    responses: createApiResponse(createUserSchema, "Success"),
});
router.post("/register", register)

// LOGIN FORM
registry.registerPath({
    method: "post",
    path: "/api/auth/login",
    description: "This route is for logging in a user.",
    tags: ["Authentication"],
    request: {
        body: createApiReqestBody(loginUserSchema),
    },
    responses: createApiResponse(loginUserSchema, "Success"),
});
router.post("/login", login)

// FORGOT PASSWORD
registry.registerPath({
    method: "post",
    path: "/api/auth/forgot-password",
    description: "This route is for requesting a password reset.",
    tags: ["Authentication"],
    request: {
        body: createApiReqestBody(forgotPasswordSchema),
    },
    responses: createApiResponse(forgotPasswordSchema, "Success"),
});
router.post("/forgot-password", forgotPassword)

// RESET PASSWORD
registry.registerPath({
    method: "post",
    path: "/api/auth/reset-password",
    description: "This route is for resetting password with token.",
    tags: ["Authentication"],
    request: {
        body: createApiReqestBody(resetPasswordSchema),
    },
    responses: createApiResponse(resetPasswordSchema, "Success"),
});
router.post("/reset-password", resetPassword)

//LOGGED INFORMATION
registry.registerPath({
    method: "get",
    path: "/api/auth/me",
    description: "This route is for getting loggin user information.",
    tags: ["Authentication"],
    security: [{ authorization: [] }],
    responses: createApiResponse(loginUserSchema, "Success"),
});
router.get("/me", protect, getMe)

export default router
