"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
const sendEmail = async ({ email, subject, html, }) => {
    const msg = {
        to: "paul172v@aol.com", // Change to your recipient
        from: "donotreply172v@gmx.com", // <----- Verified sender
        subject: `(From portfolio) ${subject}`,
        html: html,
    };
    try {
        await mail_1.default.send(msg);
        console.log("Email sent");
    }
    catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
};
exports.default = sendEmail;
//// emails currently sent to mailtrap.io
