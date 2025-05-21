"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// backend/middleware/errorHandler.ts
var errorHandler_exports = {};
__export(errorHandler_exports, {
  ErrorHandler: () => ErrorHandler,
  asyncCatch: () => asyncCatch,
  default: () => errorHandler_default
});
module.exports = __toCommonJS(errorHandler_exports);

// backend/config/envConfig.ts
var import_dotenv = __toESM(require("dotenv"));
var import_envalid = require("envalid");
import_dotenv.default.config();
var env = (0, import_envalid.cleanEnv)(process.env, {
  NODE_ENV: (0, import_envalid.str)({ devDefault: (0, import_envalid.testOnly)("test"), choices: ["development", "production", "test"] }),
  HOST: (0, import_envalid.host)({ devDefault: (0, import_envalid.testOnly)("localhost") }),
  PORT: (0, import_envalid.port)({ devDefault: (0, import_envalid.testOnly)(3e3) }),
  MONGODB_URI: (0, import_envalid.str)({ desc: "MongoDB connection string" }),
  JWT_SECRET: (0, import_envalid.str)({ desc: "Secret key for JWT" }),
  JWT_EXPIRES_IN: (0, import_envalid.str)({ default: "1d", desc: "JWT expiration time" }),
  CORS_ORIGIN: (0, import_envalid.str)({ devDefault: (0, import_envalid.testOnly)("http://localhost:3000") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: (0, import_envalid.num)({ devDefault: (0, import_envalid.testOnly)(1e3) }),
  COMMON_RATE_LIMIT_WINDOW_MS: (0, import_envalid.num)({ devDefault: (0, import_envalid.testOnly)(1e3) })
  // Email service configuration
  // SMTP_HOST: str({ desc: "SMTP host for email service" }),
  // SMTP_PORT: num({ desc: "SMTP port for email service" }),
  // SMTP_USER: str({ desc: "SMTP username" }),
  // SMTP_PASS: str({ desc: "SMTP password" }),
  // SMTP_FROM: str({ desc: "Email sender address" }),
  // RESET_PASSWORD_EXPIRES_IN: str({ default: "1h", desc: "Password reset token expiration time" }),
});

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

// backend/middleware/errorHandler.ts
var unexpectedRequest = (_req, res, next) => {
  return next(ErrorHandler.NotFound("Resources not found"));
};
var addErrorToRequestLog = (err, _req, res, next) => {
  res.locals.err = err;
  next(err);
};
var returnErrorToUser = (error, _req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  error = { ...error, statusCode, message };
  if (env.NODE_ENV === "development") {
    console.log(error);
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      error,
      stack: error.stack
    });
  }
  if (env.NODE_ENV === "production") {
    if (error.name === "CastError") {
      const message2 = `Resource Not Found. Invalid ${error.path}`;
      error = new ErrorHandler(message2, 400);
    }
    if (error.name === "ValidationError") {
      const message2 = Object.values(error.errors).map((val) => val.message).join(", ");
      error = new ErrorHandler(message2, 400);
    }
    if (error.name === "ZodError") {
      const message2 = error.issues.map((issue) => {
        const fieldName = issue.path[0];
        const fieldNameLower = fieldName.toLowerCase();
        const messageLower = issue.message.toLowerCase();
        if (!messageLower.includes(fieldNameLower)) {
          return `${fieldName}: ${issue.message}`;
        }
        return issue.message;
      }).join(", ");
      error = new ErrorHandler(message2, 400);
    }
    if (error.code === 11e3) {
      const message2 = `${Object.keys(error.keyValue)} Already exists in database`;
      error = new ErrorHandler(message2, 400);
    }
    if (error.name === "JsonWebTokenError") {
      const message2 = "JSON web token is invalid. Try Again!!!";
      error = new ErrorHandler(message2, 400);
    }
    if (error.name === "TokenExipiredError") {
      const message2 = "JSON web token is Expired. Try Again!!!";
      error = new ErrorHandler(message2, 400);
    }
    return ServiceResponse.failure(error.message || "Internal Server Error", null, error.statusCode, res);
  }
};
var ErrorHandler = class _ErrorHandler extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
  static BadRequest(message) {
    return new _ErrorHandler(message, 400);
  }
  static NotFound(message) {
    return new _ErrorHandler(message, 404);
  }
  static InternalServerError(message = "Internal Server Error") {
    return new _ErrorHandler(message, 500);
  }
};
var asyncCatch = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
var errorHandler_default = () => [unexpectedRequest, addErrorToRequestLog, returnErrorToUser];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorHandler,
  asyncCatch
});
//# sourceMappingURL=errorHandler.js.map