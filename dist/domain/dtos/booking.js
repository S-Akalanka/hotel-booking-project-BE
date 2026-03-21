"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingDTO = void 0;
var zod_1 = require("zod");
exports.CreateBookingDTO = zod_1.z.object({
    userId: zod_1.z.string(),
    hotelId: zod_1.z.string(),
    checkIn: zod_1.z.string(),
    checkOut: zod_1.z.string(),
    noOfRooms: zod_1.z.number(),
    roomType: zod_1.z.string(),
    noOfGuests: zod_1.z.number(),
    roomNumbers: zod_1.z.array(zod_1.z.number()).optional(),
    price: zod_1.z.number().optional(),
    status: zod_1.z.enum(["PENDING", "CONFIRMED", "CANCELLED"]).optional(),
    paymentStatus: zod_1.z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]).optional(),
});
//# sourceMappingURL=booking.js.map