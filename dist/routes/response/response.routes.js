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

// backend/routes/response/response.routes.ts
var response_routes_exports = {};
__export(response_routes_exports, {
  default: () => response_routes_default,
  registry: () => registry
});
module.exports = __toCommonJS(response_routes_exports);
var import_express = require("express");

// backend/routes/response/response.controller.ts
var import_http_status_codes3 = require("http-status-codes");

// backend/routes/response/response.model.ts
var import_mongoose = __toESM(require("mongoose"));
var responseSchema = new import_mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "Response message is required"]
    },
    internalNotes: {
      type: String
    },
    createdBy: {
      type: import_mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"]
    },
    complaint: {
      type: import_mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: [true, "Complaint reference is required"]
    }
  },
  {
    timestamps: true
  }
);
var Response = import_mongoose.default.model("Response", responseSchema);

// backend/routes/complaint/complaint.model.ts
var import_mongoose2 = __toESM(require("mongoose"));

// backend/utils/enums.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["CITIZEN"] = "CITIZEN";
  UserRole2["AGENCY_STAFF"] = "AGENCY_STAFF";
  UserRole2["ADMIN"] = "ADMIN";
  return UserRole2;
})(UserRole || {});
var ComplaintStatus = /* @__PURE__ */ ((ComplaintStatus2) => {
  ComplaintStatus2["SUBMITTED"] = "SUBMITTED";
  ComplaintStatus2["UNDER_REVIEW"] = "UNDER_REVIEW";
  ComplaintStatus2["IN_PROGRESS"] = "IN_PROGRESS";
  ComplaintStatus2["RESOLVED"] = "RESOLVED";
  ComplaintStatus2["REJECTED"] = "REJECTED";
  ComplaintStatus2["ESCALATED"] = "ESCALATED";
  return ComplaintStatus2;
})(ComplaintStatus || {});

// backend/routes/complaint/complaint.model.ts
var complaintSchema = new import_mongoose2.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    location: {
      type: String,
      required: [true, "Location is required"]
    },
    status: {
      type: String,
      enum: Object.values(ComplaintStatus),
      default: "SUBMITTED" /* SUBMITTED */
    },
    submittedBy: {
      type: import_mongoose2.Schema.Types.ObjectId,
      ref: "User"
    },
    handledBy: {
      type: import_mongoose2.Schema.Types.ObjectId,
      ref: "Agency"
    },
    attachments: [
      {
        type: import_mongoose2.Schema.Types.ObjectId,
        ref: "Attachment"
      }
    ],
    responses: [
      {
        type: import_mongoose2.Schema.Types.ObjectId,
        ref: "Response"
      }
    ]
  },
  {
    timestamps: true
  }
);
complaintSchema.index({ category: 1, status: 1 });
complaintSchema.index({ submittedBy: 1 });
complaintSchema.index({ handledBy: 1 });
var Complaint = import_mongoose2.default.model("Complaint", complaintSchema);

// backend/routes/user/user.model.ts
var import_mongoose3 = __toESM(require("mongoose"));
var import_bcryptjs = __toESM(require("bcryptjs"));
var userSchema = new import_mongoose3.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
        message: "Please enter a valid email"
      }
    },
    agencyId: {
      type: import_mongoose3.Schema.Types.ObjectId,
      ref: "Agency"
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: "CITIZEN" /* CITIZEN */
    },
    complaintsSubmitted: [
      {
        type: import_mongoose3.Schema.Types.ObjectId,
        ref: "Complaint"
      }
    ],
    responses: [
      {
        type: import_mongoose3.Schema.Types.ObjectId,
        ref: "Response"
      }
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  {
    timestamps: true
  }
);
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await import_bcryptjs.default.genSalt(10);
    this.password = await import_bcryptjs.default.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.comparePassword = async function(candidatePassword) {
  return import_bcryptjs.default.compare(candidatePassword, this.password);
};
var User = import_mongoose3.default.model("User", userSchema);

// backend/routes/agency/agency.model.ts
var import_mongoose4 = __toESM(require("mongoose"));
var agencySchema = new import_mongoose4.Schema(
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
var Agency = import_mongoose4.default.model("Agency", agencySchema);

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
var ServiceResponseSchema = (dataSchema) => import_zod.z.object({
  success: import_zod.z.boolean(),
  message: import_zod.z.string(),
  responseObject: dataSchema.optional(),
  statusCode: import_zod.z.number()
});

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

// backend/routes/response/response.schema.ts
var import_zod2 = require("zod");
var createResponseSchema = import_zod2.z.object({
  message: import_zod2.z.string().min(1, "Message is required"),
  internalNotes: import_zod2.z.string().optional(),
  complaint: import_zod2.z.string()
});

// backend/routes/response/response.controller.ts
var createResponse = asyncCatch(async (req, res, next) => {
  const validatedData = createResponseSchema.parse(req.body);
  const complaint = await Complaint.findById(validatedData.complaint);
  if (!complaint) {
    return next(new ErrorHandler("Complaint not found", import_http_status_codes3.StatusCodes.NOT_FOUND));
  }
  if (req.user.role === "CITIZEN" /* CITIZEN */) {
    if (complaint.submittedBy.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("You do not have permission to respond to this complaint", import_http_status_codes3.StatusCodes.FORBIDDEN));
    }
    delete validatedData.internalNotes;
  } else if (req.user.role === "AGENCY_STAFF" /* AGENCY_STAFF */) {
    const agency = await Agency.findOne({ contactEmail: req.user.email });
    if (!agency || complaint.handledBy && complaint.handledBy.toString() !== agency._id) {
      return next(new ErrorHandler("You do not have permission to respond to this complaint", import_http_status_codes3.StatusCodes.FORBIDDEN));
    }
  }
  const newResponse = await Response.create({
    ...validatedData,
    createdBy: req.user._id
  });
  await Complaint.findByIdAndUpdate(validatedData.complaint, {
    $push: { responses: newResponse._id }
  });
  await User.findByIdAndUpdate(req.user._id, {
    $push: { responses: newResponse._id }
  });
  res.status(import_http_status_codes3.StatusCodes.CREATED).json({
    status: "success",
    data: {
      response: newResponse
    }
  });
});
var getResponses = asyncCatch(async (req, res, next) => {
  const complaint = await Complaint.findById(req.params.complaintId);
  if (!complaint) {
    return next(new ErrorHandler("Complaint not found", import_http_status_codes3.StatusCodes.NOT_FOUND));
  }
  if (req.user.role === "CITIZEN" /* CITIZEN */) {
    if (complaint.submittedBy.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("You do not have permission to view these responses", import_http_status_codes3.StatusCodes.FORBIDDEN));
    }
  } else if (req.user.role === "AGENCY_STAFF" /* AGENCY_STAFF */) {
    const agency = await Agency.findOne({ contactEmail: req.user.email });
    if (!agency || complaint.handledBy && complaint.handledBy.toString() !== agency._id.toString()) {
      return next(new ErrorHandler("You do not have permission to view these responses", import_http_status_codes3.StatusCodes.FORBIDDEN));
    }
  }
  const responses = await Response.find({ complaint: req.params.complaintId }).populate("createdBy", "name email role").sort({ createdAt: -1 });
  let filteredResponses = responses;
  if (req.user.role === "CITIZEN" /* CITIZEN */) {
    filteredResponses = responses.map((response) => {
      const responseObj = response.toObject();
      delete responseObj.internalNotes;
      return responseObj;
    });
  }
  res.status(import_http_status_codes3.StatusCodes.OK).json({
    status: "success",
    results: filteredResponses.length,
    data: {
      responses: filteredResponses
    }
  });
});

// backend/middleware/auth.middleware.ts
var import_http_status_codes4 = require("http-status-codes");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var protect = asyncCatch(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorHandler("You are not logged in. Please log in to get access.", import_http_status_codes4.StatusCodes.UNAUTHORIZED));
  }
  const decoded = import_jsonwebtoken.default.verify(token, env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ErrorHandler("The user belonging to this token no longer exists.", import_http_status_codes4.StatusCodes.UNAUTHORIZED));
  }
  req.user = user;
  next();
});

// backend/routes/response/response.routes.ts
var import_zod_to_openapi = require("@asteasolutions/zod-to-openapi");

// backend/api-docs/openAPIResponseBuilders.ts
var import_http_status_codes5 = require("http-status-codes");
function createApiResponse(schema, description, statusCode = import_http_status_codes5.StatusCodes.OK) {
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

// backend/routes/response/response.routes.ts
var import_zod3 = require("zod");
var import_zod_to_openapi2 = require("@asteasolutions/zod-to-openapi");
(0, import_zod_to_openapi2.extendZodWithOpenApi)(import_zod3.z);
var router = (0, import_express.Router)();
var registry = new import_zod_to_openapi.OpenAPIRegistry();
registry.registerComponent("securitySchemes", "Authorization", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  name: "Authorization",
  in: "header",
  description: "JWT Authorization header using the Bearer scheme. Example:"
});
router.use(protect);
registry.registerPath({
  method: "post",
  path: "/api/responses",
  description: "Create a new response to a complaint",
  tags: ["Responses"],
  security: [{ Authorization: [] }],
  request: {
    body: createApiReqestBody(createResponseSchema)
  },
  responses: createApiResponse(createResponseSchema, "Success")
});
router.post("/", createResponse);
registry.registerPath({
  method: "get",
  path: "/api/responses/complaint/{complaintId}",
  description: "Get all responses for a specific complaint",
  tags: ["Responses"],
  security: [{ Authorization: [] }],
  request: { params: import_zod3.z.object({ complaintId: import_zod3.z.string() }) },
  responses: createApiResponse(createResponseSchema, "Success")
});
router.get("/complaint/:complaintId", getResponses);
var response_routes_default = router;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registry
});
//# sourceMappingURL=response.routes.js.map