import { Request, Response } from "express";
import Stripe from "stripe";
import Booking from "../infrastructure/entities/Booking";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // 1. Verify that the request came from Stripe [cite: 302]
    event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. Handle successful payment events [cite: 220, 221]
  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId; // Retrieve our link [cite: 300]

    if (bookingId) {
      // 3. Update the Payable Entity to PAID [cite: 99, 300]
      await Booking.findByIdAndUpdate(bookingId, { paymentStatus: "PAID" });
      console.log(`Booking ${bookingId} marked as PAID`);
    }
  }

  res.status(200).json({ received: true });
};