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
  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
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

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;

    interface PopulatedHotel {
      _id: string;
      name: string;
    }

    const booking = await Booking.findById(bookingId).populate("hotelId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const hotel = booking.hotelId as unknown as PopulatedHotel;

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${hotel.name} - ${booking.roomType} Room`,
              description: `${booking.noOfRooms} room(s) for ${booking.noOfGuests} guests`,
            },
            unit_amount: Math.round(booking.price! * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${process.env.FRONTEND_URL}/booking/complete?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        bookingId: booking._id.toString(),
      },
    });

    res.send({ clientSecret: session.client_secret });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
