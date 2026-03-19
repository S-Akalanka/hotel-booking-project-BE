"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var unauthorized_error_1 = __importDefault(require("../../domain/errors/unauthorized-error"));
var isAuthenticated = function (req, res, next) {
    var auth = req.auth();
    console.log("IS_AUTHENTICATED", auth === null || auth === void 0 ? void 0 : auth.isAuthenticated);
    if (!(auth === null || auth === void 0 ? void 0 : auth.isAuthenticated)) {
        throw new unauthorized_error_1.default("Unauthorized");
    }
    next();
};
exports.default = isAuthenticated;
//# sourceMappingURL=authetication-middleware.js.map