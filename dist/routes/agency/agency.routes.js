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

// backend/routes/agency/agency.routes.ts
var agency_routes_exports = {};
__export(agency_routes_exports, {
  default: () => agency_routes_default,
  registry: () => registry
});
module.exports = __toCommonJS(agency_routes_exports);
var import_express = require("express");

// backend/routes/agency/agency.controller.ts
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

// backend/middleware/auth.middleware.ts
var import_http_status_codes4 = require("http-status-codes");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// backend/routes/user/user.model.ts
var import_mongoose2 = __toESM(require("mongoose"));

// backend/utils/enums.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["CITIZEN"] = "CITIZEN";
  UserRole2["AGENCY_STAFF"] = "AGENCY_STAFF";
  UserRole2["ADMIN"] = "ADMIN";
  return UserRole2;
})(UserRole || {});

// backend/routes/user/user.model.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var userSchema = new import_mongoose2.Schema(
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
      type: import_mongoose2.Schema.Types.ObjectId,
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
        type: import_mongoose2.Schema.Types.ObjectId,
        ref: "Complaint"
      }
    ],
    responses: [
      {
        type: import_mongoose2.Schema.Types.ObjectId,
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
var User = import_mongoose2.default.model("User", userSchema);

// backend/middleware/auth.middleware.ts
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
var restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("You do not have permission to perform this action", import_http_status_codes4.StatusCodes.FORBIDDEN));
    }
    next();
  };
};

// backend/routes/agency/agency.routes.ts
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

// backend/routes/agency/agency.routes.ts
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
registry.registerPath({
  method: "get",
  path: "/api/agencies",
  tags: ["Agencies"],
  responses: createApiResponse(import_zod3.z.null(), "Success")
});
router.get("/", getAllAgencies);
registry.registerPath({
  method: "get",
  path: "/api/agencies/{ id }",
  tags: ["Agencies"],
  request: { params: import_zod3.z.object({ id: import_zod3.z.string() }) },
  responses: createApiResponse(import_zod3.z.null(), "Success")
});
router.get("/:id", getAgency);
router.use(protect);
router.use(restrictTo("ADMIN" /* ADMIN */));
registry.registerPath({
  method: "post",
  path: "/api/agencies",
  description: "This route is for registering new agency.",
  tags: ["Agencies"],
  security: [{ Authorization: [] }],
  request: {
    body: createApiReqestBody(createAgencySchema)
  },
  responses: createApiResponse(createAgencySchema, "Success")
});
router.post("/", createAgency);
registry.registerPath({
  method: "patch",
  path: "/api/agencies/{ update_id }",
  tags: ["Agencies"],
  security: [{ Authorization: [] }],
  request: {
    params: import_zod3.z.object({ update_id: import_zod3.z.string() }),
    body: createApiReqestBody(createAgencySchema)
  },
  responses: createApiResponse(createAgencySchema, "Success")
});
router.patch("/:id", updateAgency);
registry.registerPath({
  method: "delete",
  path: "/api/agencies/{ id }",
  tags: ["Agencies"],
  security: [{ Authorization: [] }],
  request: { params: import_zod3.z.object({ id: import_zod3.z.string() }) },
  responses: createApiResponse(import_zod3.z.null(), "Success")
});
router.delete("/:id", deleteAgency);
var agency_routes_default = router;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registry
});
//# sourceMappingURL=agency.routes.js.map