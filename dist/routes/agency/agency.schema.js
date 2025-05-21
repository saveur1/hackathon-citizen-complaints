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

// backend/routes/agency/agency.schema.ts
var agency_schema_exports = {};
__export(agency_schema_exports, {
  createAgencySchema: () => createAgencySchema,
  updateAgencySchema: () => updateAgencySchema
});
module.exports = __toCommonJS(agency_schema_exports);
var import_zod = require("zod");
var createAgencySchema = import_zod.z.object({
  name: import_zod.z.string().min(2, "Name must be at least 2 characters"),
  description: import_zod.z.string().min(10, "Description must be at least 10 characters"),
  contactEmail: import_zod.z.string().email("Invalid email address"),
  serviceCategories: import_zod.z.array(import_zod.z.string()).min(1, "At least one service category is required")
});
var updateAgencySchema = import_zod.z.object({
  name: import_zod.z.string().min(2, "Name must be at least 2 characters").optional(),
  description: import_zod.z.string().min(10, "Description must be at least 10 characters").optional(),
  contactEmail: import_zod.z.string().email("Invalid email address").optional(),
  serviceCategories: import_zod.z.array(import_zod.z.string()).min(1, "At least one service category is required").optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAgencySchema,
  updateAgencySchema
});
//# sourceMappingURL=agency.schema.js.map