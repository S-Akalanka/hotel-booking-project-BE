"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var hotel_1 = __importDefault(require("./api/hotel"));
var cors_1 = __importDefault(require("cors"));
var db_1 = __importDefault(require("./infrastructure/db"));
var location_1 = __importDefault(require("./api/location"));
var express_2 = require("@clerk/express");
var global_error_handling_middleware_1 = __importDefault(require("./api/middleware/global-error-handling-middleware"));
var user_1 = __importDefault(require("./api/user"));
var booking_1 = __importDefault(require("./api/booking"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173"
}));
app.use((0, express_2.clerkMiddleware)());
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use("/api/hotels", hotel_1.default);
app.use("/api/locations", location_1.default);
app.use("/api/users", user_1.default);
app.use("/api/booking", booking_1.default);
app.use(global_error_handling_middleware_1.default);
(0, db_1.default)();
var PORT = 8000;
app.listen(PORT, function () {
    console.log("Server is listening on PORT: ", PORT);
});
//# sourceMappingURL=index.js.map