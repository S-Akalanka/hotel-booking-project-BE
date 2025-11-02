import { requireAuth } from "@clerk/express";
import express from "express"
import { createUser } from "../application/user";

const userRouter = express.Router();

userRouter
    .route("/")
    .post(requireAuth(),createUser)

export default userRouter;