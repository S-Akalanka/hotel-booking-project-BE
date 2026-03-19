"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var location_1 = require("../application/location");
var locationRouter = express_1.default.Router();
locationRouter
    .route("/")
    .get(location_1.getAllLocations);
exports.default = locationRouter;
//# sourceMappingURL=location.js.map