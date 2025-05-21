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

// backend/routes/agency/agency.controller.ts
var agency_controller_exports = {};
__export(agency_controller_exports, {
  createAgency: () => createAgency,
  deleteAgency: () => deleteAgency,
  getAgency: () => getAgency,
  getAllAgencies: () => getAllAgencies,
  updateAgency: () => updateAgency
});
module.exports = __toCommonJS(agency_controller_exports);
var import_http_status_codes3 = require("http-status-codes");

// backend/routes/agency/agency.model.ts
var import_mongoose = __toESM(require("mongoose"));
var agencySchema = new import_mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Agency name is required"],
      trim: true,
      unique: true
    },
    description: {
      type: String,
      required: [true, "Agency description is required"]
    },
    contactEmail: {
      type: String,
      required: [true, "Contact email is required"],
      lowercase: true,
      validate: {
        validator: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
        message: "Please enter a valid email"
      }
    },
    serviceCategories: [
      {
        type: String,
        required: [true, "At least one service category is required"]
      }
    ]
  },
  {
    timestamps: true
  }
);
var Agency = import_mongoose.default.model("Agency", agencySchema);

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

// backend/utils/serviceResponse.ts
var import_http_status_codes2 = require("http-status-codes");
var import_zod = require("zod");

// backend/middleware/errorHandler.ts
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

// backend/routes/agency/agency.schema.ts
var import_zod2 = require("zod");
var createAgencySchema = import_zod2.z.object({
  name: import_zod2.z.string().min(2, "Name must be at least 2 characters"),
  description: import_zod2.z.string().min(10, "Description must be at least 10 characters"),
  contactEmail: import_zod2.z.string().email("Invalid email address"),
  serviceCategories: import_zod2.z.array(import_zod2.z.string()).min(1, "At least one service category is required")
});
var updateAgencySchema = import_zod2.z.object({
  name: import_zod2.z.string().min(2, "Name must be at least 2 characters").optional(),
  description: import_zod2.z.string().min(10, "Description must be at least 10 characters").optional(),
  contactEmail: import_zod2.z.string().email("Invalid email address").optional(),
  serviceCategories: import_zod2.z.array(import_zod2.z.string()).min(1, "At least one service category is required").optional()
});

// backend/routes/agency/agency.controller.ts
var createAgency = asyncCatch(async (req, res, next) => {
  const validatedData = createAgencySchema.parse(req.body);
  const existingAgency = await Agency.findOne({ name: validatedData.name });
  if (existingAgency) {
    return next(new ErrorHandler("Agency with this name already exists", import_http_status_codes3.StatusCodes.CONFLICT));
  }
  const newAgency = await Agency.create(validatedData);
  res.status(import_http_status_codes3.StatusCodes.CREATED).json({
    status: "success",
    data: {
      agency: newAgency
    }
  });
});
var getAllAgencies = asyncCatch(async (req, res, next) => {
  const agencies = await Agency.find();
  res.status(import_http_status_codes3.StatusCodes.OK).json({
    status: "success",
    results: agencies.length,
    data: {
      agencies
    }
  });
});
var getAgency = asyncCatch(async (req, res, next) => {
  const agency = await Agency.findById(req.params.id);
  if (!agency) {
    return next(new ErrorHandler("Agency not found", import_http_status_codes3.StatusCodes.NOT_FOUND));
  }
  res.status(import_http_status_codes3.StatusCodes.OK).json({
    status: "success",
    data: {
      agency
    }
  });
});
var updateAgency = asyncCatch(async (req, res, next) => {
  const validatedData = updateAgencySchema.parse(req.body);
  const updatedAgency = await Agency.findByIdAndUpdate(req.params.id, validatedData, {
    new: true,
    runValidators: true
  });
  if (!updatedAgency) {
    return next(new ErrorHandler("Agency not found", import_http_status_codes3.StatusCodes.NOT_FOUND));
  }
  res.status(import_http_status_codes3.StatusCodes.OK).json({
    status: "success",
    data: {
      agency: updatedAgency
    }
  });
});
var deleteAgency = asyncCatch(async (req, res, next) => {
  const agency = await Agency.findByIdAndDelete(req.params.id);
  if (!agency) {
    return next(new ErrorHandler("Agency not found", import_http_status_codes3.StatusCodes.NOT_FOUND));
  }
  res.status(import_http_status_codes3.StatusCodes.NO_CONTENT).json({
    status: "success",
    data: null
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAgency,
  deleteAgency,
  getAgency,
  getAllAgencies,
  updateAgency
});
//# sourceMappingURL=agency.controller.js.map