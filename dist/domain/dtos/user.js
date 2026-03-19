"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDTO = exports.UserDTO = void 0;
var zod_1 = require("zod");
exports.UserDTO = zod_1.z.object({
    clerkId: zod_1.z.string(),
    role: zod_1.z.enum(["user", "admin"]).optional(),
    fulltName: zod_1.z.string(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().optional(),
    nIdOrPassPortNum: zod_1.z.string().optional(),
    email: zod_1.z.string(),
    imageUrl: zod_1.z.string().optional(),
    phoneNumbers: zod_1.z.array(zod_1.z.string()).optional(),
    address: zod_1.z.string().optional(),
});
exports.UpdateUserDTO = zod_1.z.object({
    clerkId: zod_1.z.string().optional(),
    role: zod_1.z.enum(["user", "admin"]).optional(),
    fulltName: zod_1.z.string().optional(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().optional(),
    nIdOrPassPortNum: zod_1.z.string().optional(),
    email: zod_1.z.string(),
    imageUrl: zod_1.z.string().optional(),
    phoneNumbers: zod_1.z.array(zod_1.z.string()).optional(),
    address: zod_1.z.string().optional(),
});
//# sourceMappingURL=user.js.map