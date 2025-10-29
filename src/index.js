import "dotenv/config";
import express from "express"
import hotelRouter from "./api/hotel.js";
import cors from 'cors'
import connectDB from "./db.js";
import locationRouter from "./api/location.js";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173"
    })
)

app.use("/api/hotels",hotelRouter)
app.use("/api/locations",locationRouter); 

const PORT = 8000;

app.listen(PORT);

connectDB();
