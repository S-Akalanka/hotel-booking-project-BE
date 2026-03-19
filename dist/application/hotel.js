"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHotelsBySearchQuery = exports.searchHotels = exports.filterHotels = exports.deleteHotel = exports.patchHotel = exports.updateHotel = exports.getHotelById = exports.createHotel = exports.getAllHotels = void 0;
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var Hotel_1 = __importDefault(require("../infrastructure/entities/Hotel"));
var hotel_1 = require("../domain/dtos/hotel");
var embeddings_1 = require("./utils/embeddings");
var getAllHotels = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hotels, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Hotel_1.default.find()];
            case 1:
                hotels = _a.sent();
                res.status(200).json(hotels);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllHotels = getAllHotels;
var createHotel = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hotelData, result, embedding, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                hotelData = req.body;
                result = hotel_1.CreateHotelDTO.safeParse(hotelData);
                if (!result.success) {
                    throw new validation_error_1.default("".concat(result.error.message));
                }
                return [4 /*yield*/, (0, embeddings_1.generateEmbedding)("".concat(result.data.name, " ").concat(result.data.description, " ").concat(result.data.location, " ").concat(result.data.price))];
            case 1:
                embedding = _a.sent();
                return [4 /*yield*/, Hotel_1.default.create(__assign(__assign({}, result.data), { embedding: embedding }))];
            case 2:
                _a.sent();
                res.status(201).send();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createHotel = createHotel;
var getHotelById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, hotel, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = req.params._id;
                return [4 /*yield*/, Hotel_1.default.findById(_id)];
            case 1:
                hotel = _a.sent();
                if (!hotel) {
                    throw new not_found_error_1.default("Hotel not found");
                }
                res.status(200).json(hotel);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getHotelById = getHotelById;
var updateHotel = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, hotelData, hotel, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                _id = req.params._id;
                hotelData = req.body;
                if (!hotelData.name ||
                    !hotelData.location ||
                    !hotelData.price ||
                    !Array.isArray(hotelData.images) ||
                    hotelData.images.length === 0) {
                    throw new validation_error_1.default("Invalid hotel data");
                }
                return [4 /*yield*/, Hotel_1.default.findById({ _id: _id })];
            case 1:
                hotel = _a.sent();
                if (!hotel) {
                    throw new not_found_error_1.default("Hotel not found");
                }
                return [4 /*yield*/, Hotel_1.default.findByIdAndUpdate(_id, hotelData)];
            case 2:
                _a.sent();
                res.status(200).json(hotelData);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateHotel = updateHotel;
var patchHotel = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, hotelData, hotel, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                _id = req.params._id;
                hotelData = req.body;
                if (!hotelData.price) {
                    throw new validation_error_1.default("Price is required");
                }
                return [4 /*yield*/, Hotel_1.default.findById(_id)];
            case 1:
                hotel = _a.sent();
                if (!hotel) {
                    throw new not_found_error_1.default("Hotel not found");
                }
                return [4 /*yield*/, Hotel_1.default.findByIdAndUpdate(_id, { price: hotelData.price })];
            case 2:
                _a.sent();
                res.status(200).send();
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.patchHotel = patchHotel;
var deleteHotel = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, hotel, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                _id = req.params._id;
                return [4 /*yield*/, Hotel_1.default.findById(_id)];
            case 1:
                hotel = _a.sent();
                if (!hotel) {
                    throw new not_found_error_1.default("Hotel not found");
                }
                return [4 /*yield*/, Hotel_1.default.findByIdAndDelete(_id)];
            case 2:
                _a.sent();
                res.status(200).send();
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                next(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteHotel = deleteHotel;
var filterHotels = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, location_1, checkIn, checkOut, guest, hotels, filteredHotels, hotels, filteredHotels, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.query, location_1 = _a.location, checkIn = _a.checkIn, checkOut = _a.checkOut, guest = _a.guest;
                if (!(!location_1 && !checkIn && !checkOut && !guest)) return [3 /*break*/, 1];
                // todo error next, and validate existence
                throw new validation_error_1.default("Location or/and all data required");
            case 1:
                if (!(location_1 && checkIn && checkOut && guest !== "0")) return [3 /*break*/, 3];
                return [4 /*yield*/, Hotel_1.default.find()];
            case 2:
                hotels = _b.sent();
                filteredHotels = hotels.slice(3).filter(function (hotel) {
                    return hotel.location
                        .toLowerCase()
                        .includes(String(location_1).toLowerCase());
                });
                res.status(200).json(filteredHotels);
                return [3 /*break*/, 5];
            case 3:
                if (!location_1) return [3 /*break*/, 5];
                return [4 /*yield*/, Hotel_1.default.find()];
            case 4:
                hotels = _b.sent();
                filteredHotels = hotels.filter(function (hotel) {
                    return hotel.location
                        .toLowerCase()
                        .includes(String(location_1).toLowerCase());
                });
                res.status(200).json(filteredHotels);
                _b.label = 5;
            case 5:
                res.status(400).send();
                return [3 /*break*/, 7];
            case 6:
                error_7 = _b.sent();
                next(error_7);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.filterHotels = filterHotels;
var searchHotels = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, query_1, sortBy, page, maxPrice_1, minPrice_1, rating_1, amenities, hotels, amenitiesArray_1, pageNo, limit, skip, totalResults, response, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                _a = req.query, query_1 = _a.query, sortBy = _a.sortBy, page = _a.page, maxPrice_1 = _a.maxPrice, minPrice_1 = _a.minPrice, rating_1 = _a.rating, amenities = _a.amenities;
                return [4 /*yield*/, Hotel_1.default.find()];
            case 1:
                hotels = _b.sent();
                if (!query_1 &&
                    !sortBy &&
                    !page &&
                    !maxPrice_1 &&
                    !minPrice_1 &&
                    !rating_1 &&
                    !amenities) {
                    return [2 /*return*/, res.status(200).json(hotels)];
                }
                if (!sortBy) return [3 /*break*/, 7];
                if (!(sortBy === "price-low")) return [3 /*break*/, 3];
                return [4 /*yield*/, Hotel_1.default.find().sort({ price: 1 })];
            case 2:
                hotels = _b.sent();
                return [3 /*break*/, 7];
            case 3:
                if (!(sortBy === "price-high")) return [3 /*break*/, 5];
                return [4 /*yield*/, Hotel_1.default.find().sort({ price: -1 })];
            case 4:
                hotels = _b.sent();
                return [3 /*break*/, 7];
            case 5:
                if (!(sortBy === "rating")) return [3 /*break*/, 7];
                return [4 /*yield*/, Hotel_1.default.find().sort({ rating: -1 })];
            case 6:
                hotels = _b.sent();
                _b.label = 7;
            case 7:
                if (rating_1) {
                    hotels = hotels.filter(function (hotel) {
                        return hotel.rating >= parseFloat(rating_1);
                    });
                }
                // amenities
                if (amenities) {
                    amenitiesArray_1 = Array.isArray(amenities) ? amenities : [amenities];
                    hotels = hotels.filter(function (hotel) {
                        return amenitiesArray_1.every(function (amenity) {
                            return hotel.amenities.map(function (a) { return a.name; }).includes(amenity);
                        });
                    });
                }
                // query
                if (query_1) {
                    hotels = hotels.filter(function (hotel) {
                        return (hotel.name.toLowerCase().includes(String(query_1).toLowerCase()) ||
                            hotel.location.toLowerCase().includes(String(query_1).toLowerCase()));
                    });
                }
                // price range
                if (minPrice_1 && maxPrice_1) {
                    hotels = hotels.filter(function (hotel) {
                        return (hotel.price >= parseFloat(minPrice_1) &&
                            hotel.price <= parseFloat(maxPrice_1));
                    });
                }
                pageNo = parseInt(req.query.page) || 1;
                limit = 7;
                skip = (pageNo - 1) * limit;
                totalResults = hotels.length;
                //slice
                hotels = hotels.slice(skip, skip + limit);
                response = {
                    hotels: hotels,
                    totalResults: totalResults,
                };
                res.status(200).json(response);
                return [3 /*break*/, 9];
            case 8:
                error_8 = _b.sent();
                next(error_8);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.searchHotels = searchHotels;
var getAllHotelsBySearchQuery = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, query, queryEmbedding, hotels, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                result = hotel_1.SearchHotelDTO.safeParse(req.query);
                if (!result.success) {
                    throw new validation_error_1.default("".concat(result.error.message));
                }
                query = result.data.query;
                return [4 /*yield*/, (0, embeddings_1.generateEmbedding)(query)];
            case 1:
                queryEmbedding = _a.sent();
                return [4 /*yield*/, Hotel_1.default.aggregate([
                        {
                            $vectorSearch: {
                                index: "hotel_vector_index",
                                path: "embedding",
                                queryVector: queryEmbedding,
                                numCandidates: 25,
                                limit: 6,
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                images: 1,
                                location: 1,
                                price: 1,
                                rating: 1,
                                amenities: 1,
                                score: { $meta: "vectorSearchScore" },
                            },
                        },
                    ])];
            case 2:
                hotels = _a.sent();
                res.status(200).json(hotels);
                return [3 /*break*/, 4];
            case 3:
                error_9 = _a.sent();
                next(error_9);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllHotelsBySearchQuery = getAllHotelsBySearchQuery;
//# sourceMappingURL=hotel.js.map