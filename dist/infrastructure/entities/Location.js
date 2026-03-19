"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var locationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    hotels: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
var Location = mongoose_1.default.model("Location", locationSchema);
exports.default = Location;
//# sourceMappingURL=Location.js.map