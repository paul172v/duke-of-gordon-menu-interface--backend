"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const appError_1 = __importDefault(require("./utils/appError"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const app = (0, express_1.default)();
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Set Security HTTP Headers
app.use((0, helmet_1.default)());
app.use(express_1.default.json({ limit: "10kb" }));
// Data Sanitization against NoSQL query injection
app.use((0, express_mongo_sanitize_1.default)());
// Data sanitization against XSS (Cross-Site Scripting Attacks)
app.use((0, xss_clean_1.default)());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});
// Limit requests from same IP
const limiter = (0, express_rate_limit_1.default)({
    // Max requests from the same IP per time window
    max: 10000, /// ⚠️ Should be 100 but extended for testing purposes ⚠️
    // WindowM (M for milliseconds), converted to 1 hour
    windowMs: 60 * 60 * 1000,
    // Error Message
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const mainMenuRoutes_1 = __importDefault(require("./routes/mainMenuRoutes"));
app.use("/", (req, res) => res.status(200).json({ status: "success", message: "Connected successfully" }));
app.use("/api/v1/employees", employeeRoutes_1.default);
app.use("/api/v1/main-menu", mainMenuRoutes_1.default);
app.all("*", (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController_1.default);
exports.default = app;
