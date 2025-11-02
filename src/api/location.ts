import express from "express"
import { getAllLocations } from "../application/location";

const locationRouter = express.Router();

locationRouter
    .route("/")
    .get(getAllLocations)

export default locationRouter;