import express from "express"
import { createHotel, deleteHotel, getAllHotels, getHotelById, patchHotel, updateHotel } from "../application/hotel.js";
import isAuthenticated from "./middleware/authetication-middleware.js";

const hotelsRouter = express.Router();

hotelsRouter
  .route("/")
  .get(getAllHotels)
  .post(isAuthenticated,createHotel);

hotelsRouter
  .route("/:_id")
  .get(getHotelById)
  .put(updateHotel)
  .patch(patchHotel)
  .delete(deleteHotel);

export default hotelsRouter;    