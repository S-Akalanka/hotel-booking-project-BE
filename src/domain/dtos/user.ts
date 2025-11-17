import { z } from "zod";

export const UserDTO = z.object({
  clerkId: z.string(),
  role: z.enum(["user", "admin"]).optional(),
  fulltName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string().optional(),
  nIdOrPassPortNum: z.string().optional(),
  email: z.string(),
  imageUrl: z.string().optional(),
  phoneNumbers: z.array(z.string()).optional(),
  address: z.string().optional(),
});

export const UpdateUserDTO = z.object({
  clerkId: z.string().optional(),
  role: z.enum(["user", "admin"]).optional(),
  fulltName: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string().optional(),
  nIdOrPassPortNum: z.string().optional(),
  email: z.string(),
  imageUrl: z.string().optional(),
  phoneNumbers: z.array(z.string()).optional(),
  address: z.string().optional(),
});