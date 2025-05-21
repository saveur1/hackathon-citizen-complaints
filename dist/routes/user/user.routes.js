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

// backend/routes/user/user.routes.ts
var user_routes_exports = {};
__export(user_routes_exports, {
  default: () => user_routes_default,
  registry: () => registry
});
module.exports = __toCommonJS(user_routes_exports);
var import_express = require("express");

// backend/routes/user/user.model.ts
var import_mongoose = __toESM(require("mongoose"));

// backend/utils/enums.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["CITIZEN"] = "CITIZEN";
  UserRole2["AGENCY_STAFF"] = "AGENCY_STAFF";
  UserRole2["ADMIN"] = "ADMIN";
  return UserRole2;
})(UserRole || {});

// backend/routes/user/user.model.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var userSchema = new import_mongoose.Schema(
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
      type: import_mongoose.Schema.Types.ObjectId,
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
        type: import_mongoose.Schema.Types.ObjectId,
        ref: "Complaint"
      }
    ],
    responses: [
      {
        type: import_mongoose.Schema.Types.ObjectId,
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
var User = import_mongoose.default.model("User", userSchema);

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

// backend/routes/user/user.controller.ts
var getAllUsers = asyncCatch(async (req, res, next) => {
  const users = await User.find().select("-password");
  res.status(200).json({
    success: true,
    data: {
      users
    }
  });
});
var getUserById = asyncCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    data: {
      user
    }
  });
});
var updateUser = asyncCatch(async (req, res, next) => {
  const { name, email, role } = req.body;
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (role && !Object.values(UserRole).includes(role)) {
    return next(new ErrorHandler("Invalid role", 400));
  }
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("Email is already taken", 400));
    }
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      name: name || user.name,
      email: email || user.email,
      role: role || user.role
    },
    { new: true }
  ).select("-password");
  res.status(200).json({
    success: true,
    data: {
      user: updatedUser
    }
  });
});
var deleteUser = asyncCatch(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (userId === req.user._id.toString()) {
    return next(new ErrorHandler("You cannot delete your own account", 400));
  }
  await User.findByIdAndDelete(userId);
  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
});

// backend/middleware/auth.middleware.ts
var import_http_status_codes3 = require("http-status-codes");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var protect = asyncCatch(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorHandler("You are not logged in. Please log in to get access.", import_http_status_codes3.StatusCodes.UNAUTHORIZED));
  }
  const decoded = import_jsonwebtoken.default.verify(token, env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ErrorHandler("The user belonging to this token no longer exists.", import_http_status_codes3.StatusCodes.UNAUTHORIZED));
  }
  req.user = user;
  next();
});

// backend/routes/user/user.routes.ts
var import_zod_to_openapi = require("@asteasolutions/zod-to-openapi");

// backend/api-docs/openAPIResponseBuilders.ts
var import_http_status_codes4 = require("http-status-codes");
function createApiResponse(schema, description, statusCode = import_http_status_codes4.StatusCodes.OK) {
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

// backend/routes/user/user.schema.ts
var import_zod2 = require("zod");
var createUserSchema = import_zod2.z.object({
  name: import_zod2.z.string().min(2, "Name must be at least 2 characters"),
  email: import_zod2.z.string().email("Invalid email address"),
  password: import_zod2.z.string().min(8, "Password must be at least 8 characters"),
  role: import_zod2.z.nativeEnum(UserRole).optional()
});
var loginUserSchema = import_zod2.z.object({
  email: import_zod2.z.string().email("Invalid email address"),
  password: import_zod2.z.string().min(1, "Password is required")
});
var updateUserSchema = import_zod2.z.object({
  name: import_zod2.z.string().min(2, "Name must be at least 2 characters").optional(),
  email: import_zod2.z.string().email("Invalid email address").optional(),
  password: import_zod2.z.string().min(8, "Password must be at least 8 characters").optional(),
  role: import_zod2.z.nativeEnum(UserRole).optional()
});
var forgotPasswordSchema = import_zod2.z.object({
  email: import_zod2.z.string().email("Invalid email address")
});
var resetPasswordSchema = import_zod2.z.object({
  token: import_zod2.z.string(),
  password: import_zod2.z.string().min(8, "Password must be at least 8 characters")
});

// backend/routes/user/user.routes.ts
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
  path: "/api/users",
  description: "Get all users (admin only)",
  tags: ["Users"],
  security: [{ Authorization: [] }],
  responses: createApiResponse(updateUserSchema, "Success")
});
router.get(
  "/",
  protect,
  getAllUsers
);
registry.registerPath({
  method: "get",
  path: "/api/users/{id}",
  description: "Get user by ID (admin only)",
  tags: ["Users"],
  security: [{ Authorization: [] }],
  request: { params: import_zod3.z.object({ id: import_zod3.z.string() }) },
  responses: createApiResponse(updateUserSchema, "Success")
});
router.get(
  "/:id",
  protect,
  getUserById
);
registry.registerPath({
  method: "put",
  path: "/api/users/{id}",
  description: "Update user information (admin only)",
  tags: ["Users"],
  security: [{ Authorization: [] }],
  request: {
    params: import_zod3.z.object({ id: import_zod3.z.string() }),
    body: createApiReqestBody(updateUserSchema)
  },
  responses: createApiResponse(updateUserSchema, "Success")
});
router.put(
  "/:id",
  protect,
  updateUser
);
registry.registerPath({
  method: "delete",
  path: "/api/users/{id}",
  description: "Delete a user (admin only)",
  tags: ["Users"],
  security: [{ Authorization: [] }],
  request: { params: import_zod3.z.object({ id: import_zod3.z.string() }) },
  responses: {
    "200": {
      description: "User deleted successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" }
            }
          }
        }
      }
    }
  }
});
router.delete(
  "/:id",
  protect,
  deleteUser
);
var user_routes_default = router;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registry
});
//# sourceMappingURL=user.routes.js.map