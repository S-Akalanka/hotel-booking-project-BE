"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var payment_1 = require("../application/payment");
var paymentRouter = express_1.default.Router();
paymentRouter
    .route("/create-checkout-session")
    .post(payment_1.createCheckoutSession);
paymentRouter
    .route("/webhook")
    .post(payment_1.handleWebhook);
exports.default = paymentRouter;
//# sourceMappingURL=payment.js.map