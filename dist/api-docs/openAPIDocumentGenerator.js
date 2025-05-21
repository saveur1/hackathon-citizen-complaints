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

// backend/api-docs/openAPIDocumentGenerator.ts
var openAPIDocumentGenerator_exports = {};
__export(openAPIDocumentGenerator_exports, {
  generateOpenAPIDocument: () => generateOpenAPIDocument
});
module.exports = __toCommonJS(openAPIDocumentGenerator_exports);

// backend/routes/agency/agency.routes.ts
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
var ComplaintStatus = /* @__PURE__ */ ((ComplaintStatus2) => {
  ComplaintStatus2["SUBMITTED"] = "SUBMITTED";
  ComplaintStatus2["UNDER_REVIEW"] = "UNDER_REVIEW";
  ComplaintStatus2["IN_PROGRESS"] = "IN_PROGRESS";
  ComplaintStatus2["RESOLVED"] = "RESOLVED";
  ComplaintStatus2["REJECTED"] = "REJECTED";
  ComplaintStatus2["ESCALATED"] = "ESCALATED";
  return ComplaintStatus2;
})(ComplaintStatus || {});

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

// backend/routes/auth/auth.routes.ts
var import_express2 = require("express");

// backend/routes/auth/auth.controller.ts
var import_http_status_codes6 = require("http-status-codes");
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var import_crypto = __toESM(require("crypto"));

// backend/routes/user/user.schema.ts
var import_zod4 = require("zod");
var createUserSchema = import_zod4.z.object({
  name: import_zod4.z.string().min(2, "Name must be at least 2 characters"),
  email: import_zod4.z.string().email("Invalid email address"),
  password: import_zod4.z.string().min(8, "Password must be at least 8 characters"),
  role: import_zod4.z.nativeEnum(UserRole).optional()
});
var loginUserSchema = import_zod4.z.object({
  email: import_zod4.z.string().email("Invalid email address"),
  password: import_zod4.z.string().min(1, "Password is required")
});
var updateUserSchema = import_zod4.z.object({
  name: import_zod4.z.string().min(2, "Name must be at least 2 characters").optional(),
  email: import_zod4.z.string().email("Invalid email address").optional(),
  password: import_zod4.z.string().min(8, "Password must be at least 8 characters").optional(),
  role: import_zod4.z.nativeEnum(UserRole).optional()
});
var forgotPasswordSchema = import_zod4.z.object({
  email: import_zod4.z.string().email("Invalid email address")
});
var resetPasswordSchema = import_zod4.z.object({
  token: import_zod4.z.string(),
  password: import_zod4.z.string().min(8, "Password must be at least 8 characters")
});

// backend/utils/email.ts
var import_nodemailer = __toESM(require("nodemailer"));
var sendEmail = async (options) => {
  const transporter = import_nodemailer.default.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS
    }
  });
  const mailOptions = {
    from: env.SMTP_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  await transporter.sendMail(mailOptions);
};

// backend/routes/auth/auth.controller.ts
var signToken = (id) => {
  return import_jsonwebtoken2.default.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
};
var register = asyncCatch(async (req, res, next) => {
  const validatedData = createUserSchema.parse(req.body);
  const existingUser = await User.findOne({ email: validatedData.email });
  if (existingUser) {
    return next(new ErrorHandler("Email already in use", import_http_status_codes6.StatusCodes.CONFLICT));
  }
  const newUser = await User.create(validatedData);
  const token = signToken(newUser._id.toString());
  res.status(import_http_status_codes6.StatusCodes.CREATED).json({
    status: "success",
    token,
    data: {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    }
  });
});
var login = asyncCatch(async (req, res, next) => {
  const validatedData = loginUserSchema.parse(req.body);
  const user = await User.findOne({ email: validatedData.email }).select("+password");
  if (!user || !await user.comparePassword(validatedData.password)) {
    return next(new ErrorHandler("Incorrect email or password", import_http_status_codes6.StatusCodes.UNAUTHORIZED));
  }
  const token = signToken(user._id.toString());
  res.status(import_http_status_codes6.StatusCodes.OK).json({
    status: "success",
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  });
});
var getMe = asyncCatch(async (req, res, next) => {
  res.status(import_http_status_codes6.StatusCodes.OK).json({
    status: "success",
    data: {
      user: req.user
    }
  });
});
var forgotPassword = asyncCatch(async (req, res, next) => {
  const validatedData = forgotPasswordSchema.parse(req.body);
  const user = await User.findOne({ email: validatedData.email });
  if (!user) {
    return next(new ErrorHandler("No user found with that email address", import_http_status_codes6.StatusCodes.NOT_FOUND));
  }
  const resetToken = import_crypto.default.randomBytes(32).toString("hex");
  user.resetPasswordToken = import_crypto.default.createHash("sha256").update(resetToken).digest("hex");
  user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1e3);
  await user.save({ validateBeforeSave: false });
  const resetURL = `${env.CORS_ORIGIN}/reset-password/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}.
If you didn't forget your password, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 1 hour)",
      message
    });
    res.status(import_http_status_codes6.StatusCodes.OK).json({
      status: "success",
      message: "Token sent to email!"
    });
  } catch (err) {
    user.resetPasswordToken = void 0;
    user.resetPasswordExpires = void 0;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler("There was an error sending the email. Try again later!", import_http_status_codes6.StatusCodes.INTERNAL_SERVER_ERROR));
  }
});
var resetPassword = asyncCatch(async (req, res, next) => {
  const validatedData = resetPasswordSchema.parse(req.body);
  const hashedToken = import_crypto.default.createHash("sha256").update(validatedData.token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    return next(new ErrorHandler("Token is invalid or has expired", import_http_status_codes6.StatusCodes.BAD_REQUEST));
  }
  user.password = validatedData.password;
  user.resetPasswordToken = void 0;
  user.resetPasswordExpires = void 0;
  await user.save();
  const token = signToken(user._id.toString());
  res.status(import_http_status_codes6.StatusCodes.OK).json({
    status: "success",
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  });
});

// backend/routes/auth/auth.routes.ts
var import_zod_to_openapi3 = require("@asteasolutions/zod-to-openapi");
var router2 = (0, import_express2.Router)();
var registry2 = new import_zod_to_openapi3.OpenAPIRegistry();
registry2.registerPath({
  method: "post",
  path: "/api/auth/register",
  description: "This route is for registering new user.",
  tags: ["Authentication"],
  request: {
    body: createApiReqestBody(createUserSchema)
  },
  responses: createApiResponse(createUserSchema, "Success")
});
router2.post("/register", register);
registry2.registerPath({
  method: "post",
  path: "/api/auth/login",
  description: "This route is for logging in a user.",
  tags: ["Authentication"],
  request: {
    body: createApiReqestBody(loginUserSchema)
  },
  responses: createApiResponse(loginUserSchema, "Success")
});
router2.post("/login", login);
registry2.registerPath({
  method: "post",
  path: "/api/auth/forgot-password",
  description: "This route is for requesting a password reset.",
  tags: ["Authentication"],
  request: {
    body: createApiReqestBody(forgotPasswordSchema)
  },
  responses: createApiResponse(forgotPasswordSchema, "Success")
});
router2.post("/forgot-password", forgotPassword);
registry2.registerPath({
  method: "post",
  path: "/api/auth/reset-password",
  description: "This route is for resetting password with token.",
  tags: ["Authentication"],
  request: {
    body: createApiReqestBody(resetPasswordSchema)
  },
  responses: createApiResponse(resetPasswordSchema, "Success")
});
router2.post("/reset-password", resetPassword);
registry2.registerPath({
  method: "get",
  path: "/api/auth/me",
  description: "This route is for getting loggin user information.",
  tags: ["Authentication"],
  security: [{ authorization: [] }],
  responses: createApiResponse(loginUserSchema, "Success")
});
router2.get("/me", protect, getMe);

// backend/routes/complaint/complaint.routes.ts
var import_express3 = require("express");

// backend/routes/complaint/complaint.controller.ts
var import_http_status_codes7 = require("http-status-codes");

// backend/routes/complaint/complaint.model.ts
var import_mongoose3 = __toESM(require("mongoose"));
var complaintSchema = new import_mongoose3.Schema(
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
      type: import_mongoose3.Schema.Types.ObjectId,
      ref: "User"
    },
    handledBy: {
      type: import_mongoose3.Schema.Types.ObjectId,
      ref: "Agency"
    },
    attachments: [
      {
        type: import_mongoose3.Schema.Types.ObjectId,
        ref: "Attachment"
      }
    ],
    responses: [
      {
        type: import_mongoose3.Schema.Types.ObjectId,
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
var Complaint = import_mongoose3.default.model("Complaint", complaintSchema);

// backend/routes/complaint/complaint.schema.ts
var import_zod5 = require("zod");
var createComplaintSchema = import_zod5.z.object({
  title: import_zod5.z.string().min(5, "Title must be at least 5 characters"),
  description: import_zod5.z.string().min(10, "Description must be at least 10 characters"),
  location: import_zod5.z.string().min(3, "Location must be at least 3 characters"),
  handledBy: import_zod5.z.string().optional()
});
var updateComplaintSchema = import_zod5.z.object({
  title: import_zod5.z.string().min(5, "Title must be at least 5 characters").optional(),
  description: import_zod5.z.string().min(10, "Description must be at least 10 characters").optional(),
  location: import_zod5.z.string().min(3, "Location must be at least 3 characters").optional(),
  status: import_zod5.z.nativeEnum(ComplaintStatus).optional(),
  handledBy: import_zod5.z.string().optional()
});

// backend/routes/complaint/complaint.controller.ts
var import_zod6 = require("zod");
var createComplaint = asyncCatch(async (req, res, next) => {
  const validatedData = createComplaintSchema.parse(req.body);
  if (validatedData.handledBy) {
    const agency = await Agency.findById(validatedData.handledBy);
    if (!agency) {
      return next(new ErrorHandler("Agency not found", import_http_status_codes7.StatusCodes.NOT_FOUND));
    }
  }
  const newComplaint = await Complaint.create({
    ...validatedData,
    submittedBy: req.user._id
  });
  await User.findByIdAndUpdate(req.user._id, {
    $push: { complaintsSubmitted: newComplaint._id }
  });
  res.status(import_http_status_codes7.StatusCodes.CREATED).json({
    status: "success",
    data: {
      complaint: newComplaint
    }
  });
});
var getAllComplaints = asyncCatch(async (req, res, next) => {
  let query = {};
  if (req.user.role === "CITIZEN" /* CITIZEN */) {
    query = { submittedBy: req.user._id };
  } else if (req.user.role === "AGENCY_STAFF" /* AGENCY_STAFF */) {
    const agency = await Agency.findOne({ contactEmail: req.user.email });
    if (!agency) {
      return next(new ErrorHandler("Agency not found for this staff member", import_http_status_codes7.StatusCodes.NOT_FOUND));
    }
    query = { handledBy: agency._id };
  }
  if (req.query.category) {
    query = { ...query, category: req.query.category };
  }
  if (req.query.status) {
    query = { ...query, status: req.query.status };
  }
  const page = Number.parseInt(req.query.page) || 1;
  const limit = Number.parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const complaints = await Complaint.find(query).populate("submittedBy", "name email").populate("handledBy", "name contactEmail").sort({ createdAt: -1 }).skip(skip).limit(limit);
  const total = await Complaint.countDocuments(query);
  res.status(import_http_status_codes7.StatusCodes.OK).json({
    status: "success",
    results: complaints.length,
    total,
    data: {
      complaints
    }
  });
});
var getComplaint = asyncCatch(async (req, res, next) => {
  const complaint = await Complaint.findById(req.params.id).populate("submittedBy", "name email").populate("handledBy", "name contactEmail").populate("responses").populate("attachments");
  if (!complaint) {
    return next(new ErrorHandler("Complaint not found", import_http_status_codes7.StatusCodes.NOT_FOUND));
  }
  if (req.user.role === "CITIZEN" /* CITIZEN */ && complaint.submittedBy._id.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You do not have permission to view this complaint", import_http_status_codes7.StatusCodes.FORBIDDEN));
  }
  if (req.user.role === "AGENCY_STAFF" /* AGENCY_STAFF */) {
    const agency = await Agency.findOne({ contactEmail: req.user.email });
    if (!agency || complaint.handledBy && complaint.handledBy._id.toString() !== agency._id.toString()) {
      return next(new ErrorHandler("You do not have permission to view this complaint", import_http_status_codes7.StatusCodes.FORBIDDEN));
    }
  }
  res.status(import_http_status_codes7.StatusCodes.OK).json({
    status: "success",
    data: {
      complaint
    }
  });
});
var updateComplaint = asyncCatch(async (req, res, next) => {
  const validatedData = updateComplaintSchema.parse(req.body);
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    return next(new ErrorHandler("Complaint not found", import_http_status_codes7.StatusCodes.NOT_FOUND));
  }
  if (req.user.role === "CITIZEN" /* CITIZEN */) {
    if (complaint.submittedBy.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("You do not have permission to update this complaint", import_http_status_codes7.StatusCodes.FORBIDDEN));
    }
    if (complaint.status !== "SUBMITTED") {
      return next(new ErrorHandler("You can only update complaints with SUBMITTED status", import_http_status_codes7.StatusCodes.FORBIDDEN));
    }
    delete validatedData.status;
    delete validatedData.handledBy;
  } else if (req.user.role === "AGENCY_STAFF" /* AGENCY_STAFF */) {
    const agency = await Agency.findOne({ contactEmail: req.user.email });
    if (!agency || complaint.handledBy && complaint.handledBy.toString() !== agency?._id.toString()) {
      return next(new ErrorHandler("You do not have permission to update this complaint", import_http_status_codes7.StatusCodes.FORBIDDEN));
    }
    const allowedUpdates = ["status"];
    Object.keys(validatedData).forEach((key) => {
      if (!allowedUpdates.includes(key)) {
        delete validatedData[key];
      }
    });
  }
  const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, validatedData, {
    new: true,
    runValidators: true
  }).populate("submittedBy", "name email").populate("handledBy", "name contactEmail");
  res.status(import_http_status_codes7.StatusCodes.OK).json({
    status: "success",
    data: {
      complaint: updatedComplaint
    }
  });
});
var deleteComplaint = asyncCatch(async (req, res, next) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    return next(new ErrorHandler("Complaint not found", import_http_status_codes7.StatusCodes.NOT_FOUND));
  }
  if (req.user.role === "CITIZEN" /* CITIZEN */) {
    if (complaint.submittedBy.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("You do not have permission to delete this complaint", import_http_status_codes7.StatusCodes.FORBIDDEN));
    }
    if (complaint.status !== "SUBMITTED") {
      return next(new ErrorHandler("You can only delete complaints with SUBMITTED status", import_http_status_codes7.StatusCodes.FORBIDDEN));
    }
  } else if (req.user.role === "AGENCY_STAFF" /* AGENCY_STAFF */) {
    return next(new ErrorHandler("Agency staff cannot delete complaints", import_http_status_codes7.StatusCodes.FORBIDDEN));
  }
  await Complaint.findByIdAndDelete(req.params.id);
  await User.findByIdAndUpdate(complaint.submittedBy, {
    $pull: { complaintsSubmitted: complaint._id }
  });
  res.status(import_http_status_codes7.StatusCodes.NO_CONTENT).json({
    status: "success",
    data: null
  });
});
var updateComplaintStatus = asyncCatch(async (req, res, next) => {
  const statusSchema = import_zod6.z.object({
    status: import_zod6.z.enum(["SUBMITTED", "UNDER_REVIEW", "IN_PROGRESS", "RESOLVED", "REJECTED", "ESCALATED"])
  });
  const validatedData = statusSchema.parse(req.body);
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    return next(new ErrorHandler("Complaint not found", import_http_status_codes7.StatusCodes.NOT_FOUND));
  }
  if (req.user.role === "CITIZEN" /* CITIZEN */) {
    return next(new ErrorHandler("Citizens cannot update complaint status", import_http_status_codes7.StatusCodes.FORBIDDEN));
  }
  if (req.user.role === "AGENCY_STAFF" /* AGENCY_STAFF */) {
    const agency = await Agency.findOne({ contactEmail: req.user.email });
    if (!agency || complaint.handledBy && complaint.handledBy.toString() !== agency?._id.toString()) {
      return next(new ErrorHandler("You do not have permission to update this complaint", import_http_status_codes7.StatusCodes.FORBIDDEN));
    }
  }
  const updatedComplaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status: validatedData.status },
    {
      new: true,
      runValidators: true
    }
  ).populate("submittedBy", "name email").populate("handledBy", "name contactEmail");
  res.status(import_http_status_codes7.StatusCodes.OK).json({
    status: "success",
    data: {
      complaint: updatedComplaint
    }
  });
});

// backend/routes/complaint/complaint.routes.ts
var import_zod_to_openapi4 = require("@asteasolutions/zod-to-openapi");
var import_zod7 = require("zod");
var import_zod_to_openapi5 = require("@asteasolutions/zod-to-openapi");
(0, import_zod_to_openapi5.extendZodWithOpenApi)(import_zod7.z);
var router3 = (0, import_express3.Router)();
var registry3 = new import_zod_to_openapi4.OpenAPIRegistry();
registry3.registerComponent("securitySchemes", "Authorization", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  name: "Authorization",
  in: "header",
  description: "JWT Authorization header using the Bearer scheme. Example:"
});
router3.use(protect);
registry3.registerPath({
  method: "post",
  path: "/api/complaints",
  description: "This route is for sending complaints.",
  tags: ["Complaints"],
  security: [{ Authorization: [] }],
  request: {
    body: createApiReqestBody(createComplaintSchema)
  },
  responses: createApiResponse(createComplaintSchema, "Success")
});
router3.route("/").post(createComplaint).get(getAllComplaints);
registry3.registerPath({
  method: "get",
  path: "/api/complaints",
  description: "Get all complaints.",
  tags: ["Complaints"],
  security: [{ Authorization: [] }],
  responses: createApiResponse(createComplaintSchema, "Success")
});
router3.route("/:id").get(getComplaint).patch(updateComplaint).delete(restrictTo("CITIZEN" /* CITIZEN */, "ADMIN" /* ADMIN */), deleteComplaint);
registry3.registerPath({
  method: "get",
  path: "/api/complaints/{id}",
  description: "Get a specific complaint by ID.",
  tags: ["Complaints"],
  security: [{ Authorization: [] }],
  request: { params: import_zod7.z.object({ id: import_zod7.z.string() }) },
  responses: createApiResponse(createComplaintSchema, "Success")
});
registry3.registerPath({
  method: "patch",
  path: "/api/complaints/{id}",
  description: "Update a specific complaint by ID.",
  tags: ["Complaints"],
  security: [{ Authorization: [] }],
  request: {
    params: import_zod7.z.object({ id: import_zod7.z.string() }),
    body: createApiReqestBody(createComplaintSchema)
  },
  responses: createApiResponse(createComplaintSchema, "Success")
});
registry3.registerPath({
  method: "delete",
  path: "/api/complaints/{id}",
  description: "Delete a specific complaint by ID.",
  tags: ["Complaints"],
  security: [{ Authorization: [] }],
  request: { params: import_zod7.z.object({ id: import_zod7.z.string() }) },
  responses: createApiResponse(createComplaintSchema, "Success")
});
registry3.registerPath({
  method: "patch",
  path: "/api/complaints/{id}/status",
  description: "Update the status of a specific complaint by ID.",
  tags: ["Complaints"],
  security: [{ Authorization: [] }],
  request: {
    params: import_zod7.z.object({ id: import_zod7.z.string() }),
    body: createApiReqestBody(import_zod7.z.object({
      status: import_zod7.z.enum(["SUBMITTED", "UNDER_REVIEW", "IN_PROGRESS", "RESOLVED", "REJECTED", "ESCALATED"])
    }))
  },
  responses: createApiResponse(createComplaintSchema, "Success")
});
router3.patch("/:id/status", restrictTo("AGENCY_STAFF" /* AGENCY_STAFF */, "ADMIN" /* ADMIN */), updateComplaintStatus);

// backend/routes/user/user.routes.ts
var import_express4 = require("express");

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

// backend/routes/user/user.routes.ts
var import_zod_to_openapi6 = require("@asteasolutions/zod-to-openapi");
var import_zod8 = require("zod");
var import_zod_to_openapi7 = require("@asteasolutions/zod-to-openapi");
(0, import_zod_to_openapi7.extendZodWithOpenApi)(import_zod8.z);
var router4 = (0, import_express4.Router)();
var registry4 = new import_zod_to_openapi6.OpenAPIRegistry();
registry4.registerComponent("securitySchemes", "Authorization", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  name: "Authorization",
  in: "header",
  description: "JWT Authorization header using the Bearer scheme. Example:"
});
registry4.registerPath({
  method: "get",
  path: "/api/users",
  description: "Get all users (admin only)",
  tags: ["Users"],
  security: [{ Authorization: [] }],
  responses: createApiResponse(updateUserSchema, "Success")
});
router4.get(
  "/",
  protect,
  getAllUsers
);
registry4.registerPath({
  method: "get",
  path: "/api/users/{id}",
  description: "Get user by ID (admin only)",
  tags: ["Users"],
  security: [{ Authorization: [] }],
  request: { params: import_zod8.z.object({ id: import_zod8.z.string() }) },
  responses: createApiResponse(updateUserSchema, "Success")
});
router4.get(
  "/:id",
  protect,
  getUserById
);
registry4.registerPath({
  method: "put",
  path: "/api/users/{id}",
  description: "Update user information (admin only)",
  tags: ["Users"],
  security: [{ Authorization: [] }],
  request: {
    params: import_zod8.z.object({ id: import_zod8.z.string() }),
    body: createApiReqestBody(updateUserSchema)
  },
  responses: createApiResponse(updateUserSchema, "Success")
});
router4.put(
  "/:id",
  protect,
  updateUser
);
registry4.registerPath({
  method: "delete",
  path: "/api/users/{id}",
  description: "Delete a user (admin only)",
  tags: ["Users"],
  security: [{ Authorization: [] }],
  request: { params: import_zod8.z.object({ id: import_zod8.z.string() }) },
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
router4.delete(
  "/:id",
  protect,
  deleteUser
);

// backend/routes/response/response.routes.ts
var import_express5 = require("express");

// backend/routes/response/response.controller.ts
var import_http_status_codes8 = require("http-status-codes");

// backend/routes/response/response.model.ts
var import_mongoose4 = __toESM(require("mongoose"));
var responseSchema = new import_mongoose4.Schema(
  {
    message: {
      type: String,
      required: [true, "Response message is required"]
    },
    internalNotes: {
      type: String
    },
    createdBy: {
      type: import_mongoose4.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"]
    },
    complaint: {
      type: import_mongoose4.Schema.Types.ObjectId,
      ref: "Complaint",
      required: [true, "Complaint reference is required"]
    }
  },
  {
    timestamps: true
  }
);
var Response = import_mongoose4.default.model("Response", responseSchema);

// backend/routes/response/response.schema.ts
var import_zod9 = require("zod");
var createResponseSchema = import_zod9.z.object({
  message: import_zod9.z.string().min(1, "Message is required"),
  internalNotes: import_zod9.z.string().optional(),
  complaint: import_zod9.z.string()
});

// backend/routes/response/response.controller.ts
var createResponse = asyncCatch(async (req, res, next) => {
  const validatedData = createResponseSchema.parse(req.body);
  const complaint = await Complaint.findById(validatedData.complaint);
  if (!complaint) {
    return next(new ErrorHandler("Complaint not found", import_http_status_codes8.StatusCodes.NOT_FOUND));
  }
  if (req.user.role === "CITIZEN" /* CITIZEN */) {
    if (complaint.submittedBy.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("You do not have permission to respond to this complaint", import_http_status_codes8.StatusCodes.FORBIDDEN));
    }
    delete validatedData.internalNotes;
  } else if (req.user.role === "AGENCY_STAFF" /* AGENCY_STAFF */) {
    const agency = await Agency.findOne({ contactEmail: req.user.email });
    if (!agency || complaint.handledBy && complaint.handledBy.toString() !== agency._id) {
      return next(new ErrorHandler("You do not have permission to respond to this complaint", import_http_status_codes8.StatusCodes.FORBIDDEN));
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
  res.status(import_http_status_codes8.StatusCodes.CREATED).json({
    status: "success",
    data: {
      response: newResponse
    }
  });
});
var getResponses = asyncCatch(async (req, res, next) => {
  const complaint = await Complaint.findById(req.params.complaintId);
  if (!complaint) {
    return next(new ErrorHandler("Complaint not found", import_http_status_codes8.StatusCodes.NOT_FOUND));
  }
  if (req.user.role === "CITIZEN" /* CITIZEN */) {
    if (complaint.submittedBy.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("You do not have permission to view these responses", import_http_status_codes8.StatusCodes.FORBIDDEN));
    }
  } else if (req.user.role === "AGENCY_STAFF" /* AGENCY_STAFF */) {
    const agency = await Agency.findOne({ contactEmail: req.user.email });
    if (!agency || complaint.handledBy && complaint.handledBy.toString() !== agency._id.toString()) {
      return next(new ErrorHandler("You do not have permission to view these responses", import_http_status_codes8.StatusCodes.FORBIDDEN));
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
  res.status(import_http_status_codes8.StatusCodes.OK).json({
    status: "success",
    results: filteredResponses.length,
    data: {
      responses: filteredResponses
    }
  });
});

// backend/routes/response/response.routes.ts
var import_zod_to_openapi8 = require("@asteasolutions/zod-to-openapi");
var import_zod10 = require("zod");
var import_zod_to_openapi9 = require("@asteasolutions/zod-to-openapi");
(0, import_zod_to_openapi9.extendZodWithOpenApi)(import_zod10.z);
var router5 = (0, import_express5.Router)();
var registry5 = new import_zod_to_openapi8.OpenAPIRegistry();
registry5.registerComponent("securitySchemes", "Authorization", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  name: "Authorization",
  in: "header",
  description: "JWT Authorization header using the Bearer scheme. Example:"
});
router5.use(protect);
registry5.registerPath({
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
router5.post("/", createResponse);
registry5.registerPath({
  method: "get",
  path: "/api/responses/complaint/{complaintId}",
  description: "Get all responses for a specific complaint",
  tags: ["Responses"],
  security: [{ Authorization: [] }],
  request: { params: import_zod10.z.object({ complaintId: import_zod10.z.string() }) },
  responses: createApiResponse(createResponseSchema, "Success")
});
router5.get("/complaint/:complaintId", getResponses);

// backend/api-docs/openAPIDocumentGenerator.ts
var import_zod_to_openapi10 = require("@asteasolutions/zod-to-openapi");
function generateOpenAPIDocument() {
  const registry6 = new import_zod_to_openapi10.OpenAPIRegistry([
    registry,
    registry2,
    registry3,
    registry4,
    registry5
  ]);
  const generator = new import_zod_to_openapi10.OpenApiGeneratorV3(registry6.definitions);
  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger API"
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json"
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateOpenAPIDocument
});
//# sourceMappingURL=openAPIDocumentGenerator.js.map