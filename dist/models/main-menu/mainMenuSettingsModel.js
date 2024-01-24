"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mainMenuSettingsSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        default: new mongoose_1.default.Types.ObjectId(),
        required: [true, "Settings model must have an ID"],
    }, // Explicitly declare the _id field
    menuActive: {
        type: Boolean,
        required: [true, "menuActive must be included"],
        default: true,
    },
    date: {
        type: String,
        required: [true, "Menu must have a date"],
        default: Date.now().toLocaleString(),
    },
    showStarters: {
        type: Boolean,
        required: [true, "showStarters must be included"],
        default: true,
    },
    showIntermediate: {
        type: Boolean,
        required: [true, "showIntermediate must be included"],
        default: true,
    },
    showMains: {
        type: Boolean,
        required: [true, "showMains must be included"],
        default: true,
    },
    showDesserts: {
        type: Boolean,
        required: [true, "showDesserts must be included"],
        default: true,
    },
    showPrices: {
        type: Boolean,
        required: [true, "showPrices must be included"],
    },
    startersPrice: {
        type: Number,
    },
    intermediatePrice: {
        type: Number,
    },
    mainsPrice: {
        type: Number,
    },
    dessertsPrice: {
        type: Number,
    },
});
const MainMenuSettingsDetails = mongoose_1.default.model("mainMenuSetting", mainMenuSettingsSchema);
exports.default = MainMenuSettingsDetails;
