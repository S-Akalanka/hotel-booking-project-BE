import express from "express"
import { createBooking } from "../application/booking";

const bookingRouter = express.Router();

bookingRouter
  .route("/")
  .post(createBooking);

export default bookingRouter;