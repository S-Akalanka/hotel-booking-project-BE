"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var hotel_1 = require("../application/hotel");
var authetication_middleware_1 = __importDefault(require("./middleware/authetication-middleware"));
var hotelsRouter = express_1.default.Router();
hotelsRouter
    .route("/")
    .get(hotel_1.getAllHotels)
    .post(authetication_middleware_1.default, hotel_1.createHotel);
hotelsRouter
    .route('/filter')
    .get(hotel_1.filterHotels);
hotelsRouter
    .route('/search')
    .get(hotel_1.searchHotels);
hotelsRouter
    .route('/ai-search')
    .get(authetication_middleware_1.default, hotel_1.getAllHotelsBySearchQuery);
hotelsRouter
    .route("/:_id")
    .get(hotel_1.getHotelById)
    .put(hotel_1.updateHotel)
    .patch(hotel_1.patchHotel)
    .delete(hotel_1.deleteHotel);
exports.default = hotelsRouter;
//# sourceMappingURL=hotel.js.map