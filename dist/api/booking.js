"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var booking_1 = require("../application/booking");
var bookingRouter = express_1.default.Router();
bookingRouter
    .route("/")
    .post(booking_1.createBooking);
exports.default = bookingRouter;
//# sourceMappingURL=booking.js.map