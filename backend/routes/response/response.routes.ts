import { Router } from "express"
import { createResponse, getResponses } from "@/routes/response/response.controller"
import { protect } from "@/middleware/auth.middleware";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createApiReqestBody, createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { createResponseSchema } from "./response.schema";
import { z } from 'zod';
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

const router = Router()
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

router.use(protect) // All response routes require authentication

// CREATE RESPONSE
registry.registerPath({
    method: "post",
    path: "/api/responses",
    description: "Create a new response to a complaint",
    tags: ["Responses"],
    security: [{ Authorization: [] }],
    request: {
        body: createApiReqestBody(createResponseSchema),
    },
    responses: createApiResponse(createResponseSchema, "Success"),
});
router.post("/", createResponse)

// GET RESPONSES BY COMPLAINT ID
registry.registerPath({
    method: "get",
    path: "/api/responses/complaint/{complaintId}",
    description: "Get all responses for a specific complaint",
    tags: ["Responses"],
    security: [{ Authorization: [] }],
    request: { params: z.object({ complaintId: z.string() }) },
    responses: createApiResponse(createResponseSchema, "Success"),
});
router.get("/complaint/:complaintId", getResponses)

export default router
