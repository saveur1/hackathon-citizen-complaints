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

// backend/utils/httpHandlers.ts
var httpHandlers_exports = {};
__export(httpHandlers_exports, {
  ApiResponse: () => ApiResponse,
  validateRequest: () => validateRequest
});
module.exports = __toCommonJS(httpHandlers_exports);
var import_http_status_codes2 = require("http-status-codes");

// backend/utils/serviceResponse.ts
var import_http_status_codes = require("http-status-codes");
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
  static success(message, responseObject, statusCode = import_http_status_codes.StatusCodes.OK, res) {
    const serviceResponse = new _ServiceResponse(true, message, responseObject, statusCode);
    return ApiResponse(serviceResponse, res);
  }
  static failure(message, responseObject, statusCode = import_http_status_codes.StatusCodes.BAD_REQUEST, res) {
    const serviceResponse = new _ServiceResponse(false, message, responseObject, statusCode);
    return ApiResponse(serviceResponse, res);
  }
};

// backend/utils/httpHandlers.ts
var ApiResponse = (serviceResponse, response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};
var validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${err.errors.map((e) => e.message).join(", ")}`;
    const statusCode = import_http_status_codes2.StatusCodes.BAD_REQUEST;
    return ServiceResponse.failure(errorMessage, null, statusCode, res);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApiResponse,
  validateRequest
});
//# sourceMappingURL=httpHandlers.js.map