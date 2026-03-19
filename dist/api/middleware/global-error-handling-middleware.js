"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var not_found_error_1 = __importDefault(require("../../domain/errors/not-found-error"));
var validation_error_1 = __importDefault(require("../../domain/errors/validation-error"));
var unauthorized_error_1 = __importDefault(require("../../domain/errors/unauthorized-error"));
var globalErrorHandlingMiddleware = function (error, req, res, next) {
    console.log(error);
    if (error instanceof not_found_error_1.default) {
        res.status(error.statusCode).json({
            message: error.message,
        });
    }
    else if (error instanceof validation_error_1.default) {
        res.status(error.statusCode).json({
            message: error.message,
        });
    }
    else if (error instanceof unauthorized_error_1.default) {
        res.status(error.statusCode).json({
            message: error.message,
        });
    }
    else {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.default = globalErrorHandlingMiddleware;
//# sourceMappingURL=global-error-handling-middleware.js.map