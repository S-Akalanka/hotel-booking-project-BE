"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHotelDTO = exports.CreateHotelDTO = void 0;
var zod_1 = require("zod");
var RoomTypeDTO = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number(),
    features: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.CreateHotelDTO = zod_1.z.object({
    name: zod_1.z.string(),
    images: zod_1.z.array(zod_1.z.string()),
    location: zod_1.z.string(),
    rating: zod_1.z.number().min(0).max(5).optional(),
    reviews: zod_1.z.array(zod_1.z.string()).optional(),
    stripePriceId: zod_1.z.string().optional(),
    price: zod_1.z.number(),
    description: zod_1.z.string().optional(),
    amenities: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string().optional(),
        longName: zod_1.z.string().optional(),
        icon: zod_1.z.string().optional(),
    }))
        .optional(),
    highlights: zod_1.z.array(zod_1.z.string()).optional(),
    roomTypes: zod_1.z.array(RoomTypeDTO).optional(),
});
exports.SearchHotelDTO = zod_1.z.object({
    query: zod_1.z.string().min(1),
});
//# sourceMappingURL=hotel.js.map