import { z } from "zod";

export const CreateBookingDTO = z.object({
  userId: z.string(),
  hotelId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  noOfRooms: z.number(),
  roomType: z.string(),
  noOfGuests: z.number(),
  roomNumbers: z.array(z.number()).optional(),
  paymentStatus: z.enum(["PENDING", "PAID"]).optional(),
});
