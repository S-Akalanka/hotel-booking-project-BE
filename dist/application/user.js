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
exports.updateUser = exports.getPastBookings = exports.createUser = exports.getUser = void 0;
var User_1 = __importDefault(require("../infrastructure/entities/User"));
var Booking_1 = __importDefault(require("../infrastructure/entities/Booking"));
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var user_1 = require("../domain/dtos/user");
var getUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, userId, userDetails, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                auth = req.auth();
                userId = auth === null || auth === void 0 ? void 0 : auth.userId;
                return [4 /*yield*/, User_1.default.findOne({ clerkId: userId })];
            case 1:
                userDetails = _a.sent();
                res.status(200).json(userDetails);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var createUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, userId, _a, clerkId, role, fullName, firstName, lastName, email, imageUrl, phoneNumbers, address, user, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                auth = req.auth();
                userId = auth === null || auth === void 0 ? void 0 : auth.userId;
                _a = req.body, clerkId = _a.clerkId, role = _a.role, fullName = _a.fullName, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, imageUrl = _a.imageUrl, phoneNumbers = _a.phoneNumbers, address = _a.address;
                return [4 /*yield*/, User_1.default.findOne({ clerkId: userId })];
            case 1:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 3];
                return [4 /*yield*/, User_1.default.create({
                        clerkId: clerkId,
                        role: role,
                        fullName: fullName,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        imageUrl: imageUrl,
                        phoneNumbers: phoneNumbers,
                        address: address,
                    })];
            case 2:
                user = _b.sent();
                _b.label = 3;
            case 3:
                res.status(200).json(user);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                next(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var getPastBookings = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, clerkId, user, bookingList, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                auth = req.auth();
                clerkId = auth === null || auth === void 0 ? void 0 : auth.userId;
                return [4 /*yield*/, User_1.default.findOne({ clerkId: clerkId })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, next(new not_found_error_1.default("User not found"))];
                }
                return [4 /*yield*/, Booking_1.default.find({ userId: user._id })
                        .populate("hotelId")
                        .sort({ createdAt: -1 })];
            case 2:
                bookingList = _a.sent();
                if (!bookingList) {
                    return [2 /*return*/, next(new not_found_error_1.default("No bookings found for this user"))];
                }
                res.status(200).json(bookingList);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPastBookings = getPastBookings;
var updateUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, clerkId, user, result, updated, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                auth = req.auth();
                clerkId = auth === null || auth === void 0 ? void 0 : auth.userId;
                return [4 /*yield*/, User_1.default.findOne({ clerkId: clerkId })];
            case 1:
                user = _a.sent();
                if (!user) {
                    console.log("err");
                    return [2 /*return*/, next(new not_found_error_1.default("User not found"))];
                }
                result = user_1.UpdateUserDTO.safeParse(req.body);
                if (!result.success) {
                    throw new validation_error_1.default("".concat(result.error.message));
                }
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(user._id, { $set: result.data }, { new: true, runValidators: true })];
            case 2:
                updated = _a.sent();
                if (!updated) {
                    return [2 /*return*/, res.status(404).json({ error: "Hotel not found" })];
                }
                res.status(200).json(updated);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
//# sourceMappingURL=user.js.map