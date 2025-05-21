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

// backend/utils/enums.ts
var enums_exports = {};
__export(enums_exports, {
  ComplaintStatus: () => ComplaintStatus,
  UserRole: () => UserRole
});
module.exports = __toCommonJS(enums_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComplaintStatus,
  UserRole
});
//# sourceMappingURL=enums.js.map