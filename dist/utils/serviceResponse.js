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

// backend/utils/serviceResponse.ts
var serviceResponse_exports = {};
__export(serviceResponse_exports, {
  ServiceResponse: () => ServiceResponse,
  ServiceResponseSchema: () => ServiceResponseSchema
});
module.exports = __toCommonJS(serviceResponse_exports);

// backend/utils/httpHandlers.ts
var import_http_status_codes = require("http-status-codes");
var ApiResponse = (serviceResponse, response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

// backend/utils/serviceResponse.ts
var import_http_status_codes2 = require("http-status-codes");
var import_zod = require("zod");
var ServiceResponse = class _ServiceResponse {
  success;
  message;
  responseObject;
  statusCode;
  constructor(success, message, responseObject, statusCode) {
    this.success = success;
    this.message = message;
    this.responseObject = responseObject;
    this.statusCode = statusCode;
  }
  static success(message, responseObject, statusCode = import_http_status_codes2.StatusCodes.OK, res) {
    const serviceResponse = new _ServiceResponse(true, message, responseObject, statusCode);
    return ApiResponse(serviceResponse, res);
  }
  static failure(message, responseObject, statusCode = import_http_status_codes2.StatusCodes.BAD_REQUEST, res) {
    const serviceResponse = new _ServiceResponse(false, message, responseObject, statusCode);
    return ApiResponse(serviceResponse, res);
  }
};
var ServiceResponseSchema = (dataSchema) => import_zod.z.object({
  success: import_zod.z.boolean(),
  message: import_zod.z.string(),
  responseObject: dataSchema.optional(),
  statusCode: import_zod.z.number()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ServiceResponse,
  ServiceResponseSchema
});
//# sourceMappingURL=serviceResponse.js.map