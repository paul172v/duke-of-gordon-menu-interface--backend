"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
process.on("uncaughtException", (err) => {
    console.log(`❗Uncaught Exception! Shutting down!`);
    console.log(`❌ ${err}`);
    process.exit(1);
});
const dbURL = process.env.DB_URL;
const dbPassword = process.env.DB_PASSWORD;
if (!dbURL || !dbPassword) {
    console.error("Database URL or password is not set in environment variables");
    process.exit(1);
}
const db = dbURL.replace("<password>", dbPassword);
mongoose_1.default
    .connect(db)
    .then(() => console.log("Connected to database"))
    .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
});
const port = process.env.PORT || 5000;
const server = app_1.default.listen(port, () => console.log(`Listening on port ${port}`));
process.on("unhandledRejection", (err) => {
    console.log(`❗Unhandled Rejection! Shutting down!`);
    console.log(`❌ ${err}`);
    server.close(() => {
        process.exit(1);
    });
});
