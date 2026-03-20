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

import Hotel from "../infrastructure/entities/Hotel"; // Adjust path to your Hotel model

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;

    // 1. Find the booking the user just made
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // 2. Find the hotel to get its stripePriceId
    const hotel = await Hotel.findById(booking.hotelId);
    if (!hotel || !hotel.stripePriceId) {
      return res.status(400).json({ message: "Hotel or Stripe Price ID not found" });
    }

    // 3. Create the Stripe Session (Embedded Mode)
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: hotel.stripePriceId,
          quantity: booking.noOfRooms, // Or your logic for number of nights/rooms
        },
      ],
      mode: "payment",
      // This sends the user back to your site after they pay
      return_url: `${process.env.FRONTEND_URL}/booking/complete?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        bookingId: booking._id.toString(), // THIS LINKS THE PAYMENT TO THE BOOKING
      },
    });

    // 4. Send the client_secret back to the Frontend
    res.send({ clientSecret: session.client_secret });
  } catch (error: any) {
    console.error("Stripe Session Error:", error);
    res.status(500).json({ error: error.message });
  }
};