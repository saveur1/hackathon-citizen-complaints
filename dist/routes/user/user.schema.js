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

// backend/routes/user/user.schema.ts
var user_schema_exports = {};
__export(user_schema_exports, {
  createUserSchema: () => createUserSchema,
  forgotPasswordSchema: () => forgotPasswordSchema,
  loginUserSchema: () => loginUserSchema,
  resetPasswordSchema: () => resetPasswordSchema,
  updateUserSchema: () => updateUserSchema
});
module.exports = __toCommonJS(user_schema_exports);
var import_zod = require("zod");

// backend/utils/enums.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["CITIZEN"] = "CITIZEN";
  UserRole2["AGENCY_STAFF"] = "AGENCY_STAFF";
  UserRole2["ADMIN"] = "ADMIN";
  return UserRole2;
})(UserRole || {});

// backend/routes/user/user.schema.ts
var createUserSchema = import_zod.z.object({
  name: import_zod.z.string().min(2, "Name must be at least 2 characters"),
  email: import_zod.z.string().email("Invalid email address"),
  password: import_zod.z.string().min(8, "Password must be at least 8 characters"),
  role: import_zod.z.nativeEnum(UserRole).optional()
});
var loginUserSchema = import_zod.z.object({
  email: import_zod.z.string().email("Invalid email address"),
  password: import_zod.z.string().min(1, "Password is required")
});
var updateUserSchema = import_zod.z.object({
  name: import_zod.z.string().min(2, "Name must be at least 2 characters").optional(),
  email: import_zod.z.string().email("Invalid email address").optional(),
  password: import_zod.z.string().min(8, "Password must be at least 8 characters").optional(),
  role: import_zod.z.nativeEnum(UserRole).optional()
});
var forgotPasswordSchema = import_zod.z.object({
  email: import_zod.z.string().email("Invalid email address")
});
var resetPasswordSchema = import_zod.z.object({
  token: import_zod.z.string(),
  password: import_zod.z.string().min(8, "Password must be at least 8 characters")
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUserSchema,
  forgotPasswordSchema,
  loginUserSchema,
  resetPasswordSchema,
  updateUserSchema
});
//# sourceMappingURL=user.schema.js.map