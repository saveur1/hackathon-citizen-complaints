import { Router } from "express"
import {
    createComplaint,
    getAllComplaints,
    getComplaint,
    updateComplaint,
    deleteComplaint,
    updateComplaintStatus,
} from "@/routes/complaint/complaint.controller"
import { protect, restrictTo } from "@/middleware/auth.middleware"
import { UserRole } from "@/utils/enums"
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import { createApiReqestBody, createApiResponse } from "@/api-docs/openAPIResponseBuilders"
import { createComplaintSchema } from "./complaint.schema"
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

router.use(protect) // All complaint routes require authentication

// CREATE COMPLAINT
registry.registerPath({
    method: "post",
    path: "/api/complaints",
    description: "This route is for sending complaints.",
    tags: ["Complaints"],
    security: [{ Authorization: [] }],
    request: {
        body: createApiReqestBody(createComplaintSchema),
    },
    responses: createApiResponse(createComplaintSchema, "Success"),
});
router.route("/").post(createComplaint).get(getAllComplaints)

// GET ALL COMPLAINTS
registry.registerPath({
    method: "get",
    path: "/api/complaints",
    description: "Get all complaints.",
    tags: ["Complaints"],
    security: [{ Authorization: [] }],
    responses: createApiResponse(createComplaintSchema, "Success"),
});

//GET COMPLAINT BY ID, UPDATE COMPLAINT, DELETE COMPLAINT
router
    .route("/:id")
    .get(getComplaint)
    .patch(updateComplaint)
    .delete(restrictTo(UserRole.CITIZEN, UserRole.ADMIN), deleteComplaint);

// GET COMPLAINT BY ID
registry.registerPath({
    method: "get",
    path: "/api/complaints/{id}",
    description: "Get a specific complaint by ID.",
    tags: ["Complaints"],
    security: [{ Authorization: [] }],
    request: { params: z.object({ id: z.string() }) },
    responses: createApiResponse(createComplaintSchema, "Success"),
});

// UPDATE COMPLAINT
registry.registerPath({
    method: "patch",
    path: "/api/complaints/{id}",
    description: "Update a specific complaint by ID.",
    tags: ["Complaints"],
    security: [{ Authorization: [] }],
    request: {
        params: z.object({ id: z.string() }),
        body: createApiReqestBody(createComplaintSchema),
    },
    responses: createApiResponse(createComplaintSchema, "Success"),
});

// DELETE COMPLAINT
registry.registerPath({
    method: "delete",
    path: "/api/complaints/{id}",
    description: "Delete a specific complaint by ID.",
    tags: ["Complaints"],
    security: [{ Authorization: [] }],
    request: { params: z.object({ id: z.string() }) },
    responses: createApiResponse(createComplaintSchema, "Success"),
});

// UPDATE COMPLAINT STATUS
registry.registerPath({
    method: "patch",
    path: "/api/complaints/{id}/status",
    description: "Update the status of a specific complaint by ID.",
    tags: ["Complaints"],
    security: [{ Authorization: [] }],
    request: {
        params: z.object({ id: z.string() }),
        body: createApiReqestBody(z.object({
            status: z.enum(['SUBMITTED', 'UNDER_REVIEW', 'IN_PROGRESS', 'RESOLVED', 'REJECTED', 'ESCALATED'])
        })),
    },
    responses: createApiResponse(createComplaintSchema, "Success"),
});

// Add the new route
router.patch("/:id/status", restrictTo(UserRole.AGENCY_STAFF, UserRole.ADMIN), updateComplaintStatus);

export default router
