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

// backend/routes/complaint/complaint.model.ts
var complaint_model_exports = {};
__export(complaint_model_exports, {
  Complaint: () => Complaint
});
module.exports = __toCommonJS(complaint_model_exports);
var import_mongoose = __toESM(require("mongoose"));

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

// backend/routes/complaint/complaint.model.ts
var complaintSchema = new import_mongoose.Schema(
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
      type: import_mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    handledBy: {
      type: import_mongoose.Schema.Types.ObjectId,
      ref: "Agency"
    },
    attachments: [
      {
        type: import_mongoose.Schema.Types.ObjectId,
        ref: "Attachment"
      }
    ],
    responses: [
      {
        type: import_mongoose.Schema.Types.ObjectId,
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
var Complaint = import_mongoose.default.model("Complaint", complaintSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Complaint
});
//# sourceMappingURL=complaint.model.js.map