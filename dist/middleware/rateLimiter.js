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

// backend/middleware/rateLimiter.ts
var rateLimiter_exports = {};
__export(rateLimiter_exports, {
  default: () => rateLimiter_default
});
module.exports = __toCommonJS(rateLimiter_exports);
var import_express_rate_limit = require("express-rate-limit");

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

// backend/middleware/rateLimiter.ts
var rateLimiter = (0, import_express_rate_limit.rateLimit)({
  legacyHeaders: true,
  limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  windowMs: 3 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS,
  keyGenerator: (req) => req.ip
});
var rateLimiter_default = rateLimiter;
//# sourceMappingURL=rateLimiter.js.map