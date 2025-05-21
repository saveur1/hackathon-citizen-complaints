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

// backend/routes/response/response.schema.ts
var response_schema_exports = {};
__export(response_schema_exports, {
  createResponseSchema: () => createResponseSchema
});
module.exports = __toCommonJS(response_schema_exports);
var import_zod = require("zod");
var createResponseSchema = import_zod.z.object({
  message: import_zod.z.string().min(1, "Message is required"),
  internalNotes: import_zod.z.string().optional(),
  complaint: import_zod.z.string()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createResponseSchema
});
//# sourceMappingURL=response.schema.js.map