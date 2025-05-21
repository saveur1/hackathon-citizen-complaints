"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// backend/api-docs/openAPIResponseBuilders.ts
var openAPIResponseBuilders_exports = {};
__export(openAPIResponseBuilders_exports, {
  createApiReqestBody: () => createApiReqestBody,
  createApiResponse: () => createApiResponse
});
module.exports = __toCommonJS(openAPIResponseBuilders_exports);
var import_http_status_codes3 = require("http-status-codes");

// backend/utils/httpHandlers.ts
var import_http_status_codes = require("http-status-codes");

// backend/utils/serviceResponse.ts
var import_http_status_codes2 = require("http-status-codes");
var import_zod = require("zod");
var ServiceResponseSchema = (dataSchema) => import_zod.z.object({
  success: import_zod.z.boolean(),
  message: import_zod.z.string(),
  responseObject: dataSchema.optional(),
  statusCode: import_zod.z.number()
});

// backend/api-docs/openAPIResponseBuilders.ts
function createApiResponse(schema, description, statusCode = import_http_status_codes3.StatusCodes.OK) {
  return {
    [statusCode]: {
      description,
      content: {
        "application/json": {
          schema: ServiceResponseSchema(schema)
        }
      }
    }
  };
}
function createApiReqestBody(schema, type = "application/json") {
  return {
    content: {
      [type]: {
        schema
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createApiReqestBody,
  createApiResponse
});
//# sourceMappingURL=openAPIResponseBuilders.js.map