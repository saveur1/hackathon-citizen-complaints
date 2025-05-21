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

// backend/routes/auth/auth.controller.ts
var auth_controller_exports = {};
__export(auth_controller_exports, {
  forgotPassword: () => forgotPassword,
  getMe: () => getMe,
  login: () => login,
  register: () => register,
  resetPassword: () => resetPassword
});
module.exports = __toCommonJS(auth_controller_exports);
var import_http_status_codes3 = require("http-status-codes");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_crypto = __toESM(require("crypto"));

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
  return import_jsonwebtoken.default.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
};
var register = asyncCatch(async (req, res, next) => {
  const validatedData = createUserSchema.parse(req.body);
  const existingUser = await User.findOne({ email: validatedData.email });
  if (existingUser) {
    return next(new ErrorHandler("Email already in use", import_http_status_codes3.StatusCodes.CONFLICT));
  }
  const newUser = await User.create(validatedData);
  const token = signToken(newUser._id.toString());
  res.status(import_http_status_codes3.StatusCodes.CREATED).json({
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
    return next(new ErrorHandler("Incorrect email or password", import_http_status_codes3.StatusCodes.UNAUTHORIZED));
  }
  const token = signToken(user._id.toString());
  res.status(import_http_status_codes3.StatusCodes.OK).json({
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
  res.status(import_http_status_codes3.StatusCodes.OK).json({
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
    return next(new ErrorHandler("No user found with that email address", import_http_status_codes3.StatusCodes.NOT_FOUND));
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
    res.status(import_http_status_codes3.StatusCodes.OK).json({
      status: "success",
      message: "Token sent to email!"
    });
  } catch (err) {
    user.resetPasswordToken = void 0;
    user.resetPasswordExpires = void 0;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler("There was an error sending the email. Try again later!", import_http_status_codes3.StatusCodes.INTERNAL_SERVER_ERROR));
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
    return next(new ErrorHandler("Token is invalid or has expired", import_http_status_codes3.StatusCodes.BAD_REQUEST));
  }
  user.password = validatedData.password;
  user.resetPasswordToken = void 0;
  user.resetPasswordExpires = void 0;
  await user.save();
  const token = signToken(user._id.toString());
  res.status(import_http_status_codes3.StatusCodes.OK).json({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  forgotPassword,
  getMe,
  login,
  register,
  resetPassword
});
//# sourceMappingURL=auth.controller.js.map