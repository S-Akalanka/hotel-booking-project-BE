import "dotenv/config";
import express from "express"
import hotelRouter from "./api/hotel.js";
import cors from 'cors'
import connectDB from "./db.js";
import locationRouter from "./api/location.js";
import { clerkMiddleware } from "@clerk/express";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware.js";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use(clerkMiddleware());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/hotels",hotelRouter)
app.use("/api/locations",locationRouter);

app.use(globalErrorHandlingMiddleware);

connectDB();

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server is listening on PORT: ", PORT);
});