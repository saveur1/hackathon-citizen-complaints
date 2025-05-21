import { Router } from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from './user.controller';
import { protect } from "@/middleware/auth.middleware";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createApiReqestBody, createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { updateUserSchema } from "./user.schema";
import { z } from 'zod';
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

const router = Router();
export const registry = new OpenAPIRegistry();

// Register security scheme
registry.registerComponent("securitySchemes", "Authorization", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    name: "Authorization",
    in: "header",
    description: "JWT Authorization header using the Bearer scheme. Example:"
});

// GET ALL USERS
registry.registerPath({
    method: "get",
    path: "/api/users",
    description: "Get all users (admin only)",
    tags: ["Users"],
    security: [{ Authorization: [] }],
    responses: createApiResponse(updateUserSchema, "Success"),
});
router.get(
    '/',
    protect,
    getAllUsers
);

// GET USER BY ID
registry.registerPath({
    method: "get",
    path: "/api/users/{id}",
    description: "Get user by ID (admin only)",
    tags: ["Users"],
    security: [{ Authorization: [] }],
    request: { params: z.object({ id: z.string() }) },
    responses: createApiResponse(updateUserSchema, "Success"),
});
router.get(
    '/:id',
    protect,
    getUserById
);

// UPDATE USER
registry.registerPath({
    method: "put",
    path: "/api/users/{id}",
    description: "Update user information (admin only)",
    tags: ["Users"],
    security: [{ Authorization: [] }],
    request: {
        params: z.object({ id: z.string() }),
        body: createApiReqestBody(updateUserSchema),
    },
    responses: createApiResponse(updateUserSchema, "Success"),
});
router.put(
    '/:id',
    protect,
    updateUser
);

// DELETE USER
registry.registerPath({
    method: "delete",
    path: "/api/users/{id}",
    description: "Delete a user (admin only)",
    tags: ["Users"],
    security: [{ Authorization: [] }],
    request: { params: z.object({ id: z.string() }) },
    responses: {
        "200": {
            description: "User deleted successfully",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            success: { type: "boolean" },
                            message: { type: "string" }
                        }
                    }
                }
            }
        }
    }
});
router.delete(
    '/:id',
    protect,
    deleteUser
);

export default router; 