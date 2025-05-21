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

// backend/routes/complaint/complaint.schema.ts
var complaint_schema_exports = {};
__export(complaint_schema_exports, {
  createComplaintSchema: () => createComplaintSchema,
  updateComplaintSchema: () => updateComplaintSchema
});
module.exports = __toCommonJS(complaint_schema_exports);
var import_zod = require("zod");

// backend/utils/enums.ts
var ComplaintStatus = /* @__PURE__ */ ((ComplaintStatus2) => {
  ComplaintStatus2["SUBMITTED"] = "SUBMITTED";
  ComplaintStatus2["UNDER_REVIEW"] = "UNDER_REVIEW";
  ComplaintStatus2["IN_PROGRESS"] = "IN_PROGRESS";
  ComplaintStatus2["RESOLVED"] = "RESOLVED";
  ComplaintStatus2["REJECTED"] = "REJECTED";
  ComplaintStatus2["ESCALATED"] = "ESCALATED";
  return ComplaintStatus2;
})(ComplaintStatus || {});

// backend/routes/complaint/complaint.schema.ts
var createComplaintSchema = import_zod.z.object({
  title: import_zod.z.string().min(5, "Title must be at least 5 characters"),
  description: import_zod.z.string().min(10, "Description must be at least 10 characters"),
  location: import_zod.z.string().min(3, "Location must be at least 3 characters"),
  handledBy: import_zod.z.string().optional()
});
var updateComplaintSchema = import_zod.z.object({
  title: import_zod.z.string().min(5, "Title must be at least 5 characters").optional(),
  description: import_zod.z.string().min(10, "Description must be at least 10 characters").optional(),
  location: import_zod.z.string().min(3, "Location must be at least 3 characters").optional(),
  status: import_zod.z.nativeEnum(ComplaintStatus).optional(),
  handledBy: import_zod.z.string().optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createComplaintSchema,
  updateComplaintSchema
});
//# sourceMappingURL=complaint.schema.js.map