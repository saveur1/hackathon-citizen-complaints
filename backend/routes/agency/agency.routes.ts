import { Router } from "express"
import { createAgency, getAllAgencies, getAgency, updateAgency, deleteAgency } from "@/routes/agency/agency.controller"
import { protect, restrictTo } from "@/middleware/auth.middleware"
import { UserRole } from "@/utils/enums";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createApiReqestBody, createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { z } from 'zod';
import { createAgencySchema } from '@/routes/agency/agency.schema';
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

const router = Router()
export const registry = new OpenAPIRegistry();

registry.registerComponent("securitySchemes", "Authorization", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    name: "Authorization",
    in: "header",
    description: "JWT Authorization header using the Bearer scheme. Example:"
});

// Public routes

//GET ALL AGENCIES
registry.registerPath({
    method: "get",
    path: "/api/agencies",
    tags: ["Agencies"],
    responses: createApiResponse(z.null(), "Success"),
});
router.get("/", getAllAgencies)


//GET AGENCY BY ID
registry.registerPath({
    method: "get",
    path: "/api/agencies/{ id }",
    tags: ["Agencies"],
    request: { params: z.object({ id: z.string() }) },
    responses: createApiResponse(z.null(), "Success"),
});
router.get("/:id", getAgency)

// Protected routes
router.use(protect)
router.use(restrictTo(UserRole.ADMIN)) // Only admins can manage agencies


//CREATE AGENCY
registry.registerPath({
    method: "post",
    path: "/api/agencies",
    description: "This route is for registering new agency.",
    tags: ["Agencies"],
    security: [{ Authorization: [] }],
    request: {
        body: createApiReqestBody(createAgencySchema),
    },
    responses: createApiResponse(createAgencySchema, "Success"),
});
router.post("/", createAgency)


//UPDATE AGENCY
registry.registerPath({
    method: "patch",
    path: "/api/agencies/{ update_id }",
    tags: ["Agencies"],
    security: [{ Authorization: [] }],
    request: {
        params: z.object({ update_id: z.string() }),
        body: createApiReqestBody(createAgencySchema),
    },
    responses: createApiResponse(createAgencySchema, "Success"),
});
router.patch("/:id", updateAgency)


//DELETE AGENCY
registry.registerPath({
    method: "delete",
    path: "/api/agencies/{ id }",
    tags: ["Agencies"],
    security: [{ Authorization: [] }],
    request: { params: z.object({ id: z.string() }) },
    responses: createApiResponse(z.null(), "Success"),
});
router.delete("/:id", deleteAgency)

export default router
