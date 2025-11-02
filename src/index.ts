import "dotenv/config";
import express, { Request, Response, NextFunction } from "express"
import hotelRouter from "./api/hotel";
import cors from 'cors'
import connectDB from "./db";
import locationRouter from "./api/location";
import { clerkMiddleware } from "@clerk/express";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import userRouter from "./api/user";
import bookingRouter from "./api/booking";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use(clerkMiddleware());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/hotels",hotelRouter)
app.use("/api/locations",locationRouter);
app.use("/api/users",userRouter);
app.use("/api/booking",bookingRouter);

app.use(globalErrorHandlingMiddleware);

connectDB();

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server is listening on PORT: ", PORT);
});