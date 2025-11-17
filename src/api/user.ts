import { requireAuth } from "@clerk/express";
import express from "express"
import { createUser, getPastBookings, getUser, updateUser } from "../application/user";

const userRouter = express.Router();

userRouter
    .route("/")
    .get(requireAuth(), getUser)
    .post(requireAuth(),createUser)
    .put(requireAuth(), updateUser);

userRouter
   .route("/bookings")
   .get(requireAuth(), getPastBookings)

export default userRouter;