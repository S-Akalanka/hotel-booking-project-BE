import express from "express";
import { createCheckoutSession, handleWebhook } from "../application/payment";

const paymentRouter = express.Router();

paymentRouter
.route("/create-checkout-session")
.post(createCheckoutSession);

paymentRouter
.route("/webhook")
.post(handleWebhook);

export default paymentRouter;
