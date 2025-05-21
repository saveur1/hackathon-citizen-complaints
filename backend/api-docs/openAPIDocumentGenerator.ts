// import { healthCheckRegistry } from "@/routes/healthCheck/healthCheckRouter";
import { registry as agencyRegistry } from "@/routes/agency/agency.routes";
import { registry as authRegistry } from "@/routes/auth/auth.routes";
import { registry as complaintsRegistry } from "@/routes/complaint/complaint.routes";
import { registry as usersRegistry } from "@/routes/user/user.routes";
import { registry as responseRegistry } from "@/routes/response/response.routes";
import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

export function generateOpenAPIDocument() {
    const registry = new OpenAPIRegistry([ 
        agencyRegistry, 
        authRegistry, 
        complaintsRegistry,
        usersRegistry,
        responseRegistry
    ]);
    const generator = new OpenApiGeneratorV3(registry.definitions);

    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Swagger API",
        },
        externalDocs: {
            description: "View the raw OpenAPI Specification in JSON format",
            url: "/swagger.json",
        },
    });
}
