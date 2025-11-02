import { z } from "zod";

export const CreateBookingDTO = z.object({
  userId: z.string(),
  hotelId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  noOfRooms: z.number(),
  noOfGuests: z.number(),
  paymentStatus: z.enum(["PENDING", "PAID"]).optional(),
});
