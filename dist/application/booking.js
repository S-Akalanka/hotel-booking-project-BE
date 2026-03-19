"use strict";
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
exports.getBookingById = exports.getAllBookings = exports.getAllBookingsForHotel = exports.createBooking = void 0;
var booking_1 = require("../domain/dtos/booking");
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var Hotel_1 = __importDefault(require("../infrastructure/entities/Hotel"));
var unauthorized_error_1 = __importDefault(require("../domain/errors/unauthorized-error"));
var User_1 = __importDefault(require("../infrastructure/entities/User"));
var Booking_1 = __importDefault(require("../infrastructure/entities/Booking"));
var mongoose_1 = __importDefault(require("mongoose"));
var createBooking = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bookingResult, _a, userId, hotelId, checkIn, checkOut, noOfRooms, roomType, noOfGuests, price, status, paymentStatus, hotel, assignedRoomNumbers, i, roomNumber, isAvailable, existingBooking, user, newBooking, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                bookingResult = booking_1.CreateBookingDTO.safeParse(req.body);
                if (!bookingResult.success) {
                    throw new validation_error_1.default(bookingResult.error.message);
                }
                _a = bookingResult.data, userId = _a.userId, hotelId = _a.hotelId, checkIn = _a.checkIn, checkOut = _a.checkOut, noOfRooms = _a.noOfRooms, roomType = _a.roomType, noOfGuests = _a.noOfGuests, price = _a.price, status = _a.status, paymentStatus = _a.paymentStatus;
                if (!userId) {
                    throw new unauthorized_error_1.default("Unauthorized");
                }
                // Validate hotelId before querying MongoDB
                if (!mongoose_1.default.Types.ObjectId.isValid(hotelId)) {
                    throw new not_found_error_1.default("Hotel not found");
                }
                return [4 /*yield*/, Hotel_1.default.findById(hotelId)];
            case 1:
                hotel = _b.sent();
                if (!hotel) {
                    throw new not_found_error_1.default("Hotel not found");
                }
                assignedRoomNumbers = [];
                i = 0;
                _b.label = 2;
            case 2:
                if (!(i < noOfRooms)) return [3 /*break*/, 7];
                roomNumber = 0;
                isAvailable = false;
                _b.label = 3;
            case 3:
                if (!!isAvailable) return [3 /*break*/, 5];
                roomNumber = Math.floor(Math.random() * 1000) + 1;
                return [4 /*yield*/, Booking_1.default.findOne({
                        hotelId: hotelId,
                        roomNumbers: roomNumber,
                        $or: [
                            {
                                checkIn: { $lte: new Date(checkOut) },
                                checkOut: { $gte: new Date(checkIn) },
                            },
                        ],
                    })];
            case 4:
                existingBooking = _b.sent();
                isAvailable = !existingBooking;
                return [3 /*break*/, 3];
            case 5:
                assignedRoomNumbers.push(roomNumber);
                _b.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 2];
            case 7: return [4 /*yield*/, User_1.default.findOne({ clerkId: userId })];
            case 8:
                user = _b.sent();
                if (!user)
                    throw new not_found_error_1.default("User not found");
                return [4 /*yield*/, Booking_1.default.create({
                        userId: user._id,
                        hotelId: hotelId,
                        checkIn: new Date(checkIn),
                        checkOut: new Date(checkOut),
                        noOfRooms: noOfRooms,
                        roomType: roomType,
                        noOfGuests: noOfGuests,
                        roomNumbers: assignedRoomNumbers,
                        price: price,
                        status: status,
                        paymentStatus: paymentStatus,
                    })];
            case 9:
                newBooking = _b.sent();
                res.status(201).json(newBooking);
                return [3 /*break*/, 11];
            case 10:
                error_1 = _b.sent();
                console.error("Create Booking Error:", error_1);
                next(error_1);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.createBooking = createBooking;
var getAllBookingsForHotel = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hotelId, bookings, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                hotelId = req.params.hotelId;
                return [4 /*yield*/, Booking_1.default.find({ hotelId: hotelId })];
            case 1:
                bookings = _a.sent();
                res.status(200).json(bookings);
                return [2 /*return*/];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllBookingsForHotel = getAllBookingsForHotel;
var getAllBookings = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bookings, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Booking_1.default.find().sort({ createdAt: -1 })];
            case 1:
                bookings = _a.sent();
                res.status(200).json(bookings);
                return [2 /*return*/];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllBookings = getAllBookings;
var getBookingById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bookingId, booking, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                bookingId = req.params.bookingId;
                return [4 /*yield*/, Booking_1.default.findById(bookingId)];
            case 1:
                booking = _a.sent();
                if (!booking) {
                    throw new not_found_error_1.default("Booking not found");
                }
                res.status(200).json(booking);
                return [2 /*return*/];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBookingById = getBookingById;
//# sourceMappingURL=booking.js.map