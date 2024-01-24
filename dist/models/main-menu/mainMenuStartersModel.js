"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mainMenuStartersSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Entry must have a name"],
    },
    dietary: {
        type: [String],
        enum: [
            "none",
            "gf",
            "gf available",
            "v",
            "v available",
            "vgo",
            "vgo available",
        ],
        required: [true, "Entry must have dietary information"],
    },
    description: {
        type: String,
        maxlength: 241,
    },
});
const MainMenuStartersDetails = mongoose_1.default.model("mainMenuStarter", mainMenuStartersSchema);
exports.default = MainMenuStartersDetails;
