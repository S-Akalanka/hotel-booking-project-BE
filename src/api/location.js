import express from "express"
import { getAllLocations } from "../application/location.js";

const locationRouter = express.Router();

locationRouter
    .route("/")
    .get(getAllLocations)

export default locationRouter;