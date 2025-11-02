import { z } from "zod";

const RoomTypeDTO = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  features: z.array(z.string()).optional(),
});

export const CreateHotelDTO = z.object({
  name: z.string(),
  images: z.array(z.string()),
  location: z.string(),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.array(z.string()).optional(),
  price: z.number(),
  description: z.string().optional(),
  amenities: z
    .array(
      z.object({
        name: z.string().optional(),
        longName: z.string().optional(),
        icon: z.string().optional(),
      })
    )
    .optional(),
  highlights: z.array(z.string()).optional(),
  roomTypes: z.array(RoomTypeDTO).optional(),
});
