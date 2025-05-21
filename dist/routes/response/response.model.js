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

// backend/routes/response/response.model.ts
var response_model_exports = {};
__export(response_model_exports, {
  Response: () => Response
});
module.exports = __toCommonJS(response_model_exports);
var import_mongoose = __toESM(require("mongoose"));
var responseSchema = new import_mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "Response message is required"]
    },
    internalNotes: {
      type: String
    },
    createdBy: {
      type: import_mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"]
    },
    complaint: {
      type: import_mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: [true, "Complaint reference is required"]
    }
  },
  {
    timestamps: true
  }
);
var Response = import_mongoose.default.model("Response", responseSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Response
});
//# sourceMappingURL=response.model.js.map