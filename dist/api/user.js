"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("@clerk/express");
var express_2 = __importDefault(require("express"));
var user_1 = require("../application/user");
var userRouter = express_2.default.Router();
userRouter
    .route("/")
    .get((0, express_1.requireAuth)(), user_1.getUser)
    .post((0, express_1.requireAuth)(), user_1.createUser)
    .put((0, express_1.requireAuth)(), user_1.updateUser);
userRouter
    .route("/bookings")
    .get((0, express_1.requireAuth)(), user_1.getPastBookings);
exports.default = userRouter;
//# sourceMappingURL=user.js.map