import express from "express"
import { createHotel, deleteHotel, filterHotels, getAllHotels, getAllHotelsBySearchQuery, getHotelById, patchHotel, searchHotels, updateHotel } from "../application/hotel";
import isAuthenticated from "./middleware/authetication-middleware";

const hotelsRouter = express.Router();

hotelsRouter
  .route("/")
  .get(getAllHotels)
  .post(isAuthenticated,createHotel)

hotelsRouter
  .route('/filter')
  .get(filterHotels)

hotelsRouter
  .route('/search')
  .get(searchHotels)

hotelsRouter
  .route('/ai-search')
  .get(isAuthenticated, getAllHotelsBySearchQuery)

hotelsRouter
  .route("/:_id")
  .get(getHotelById)
  .put(updateHotel)
  .patch(patchHotel)
  .delete(deleteHotel)

export default hotelsRouter;    