"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (options) => {
    // 1) Create a transporter
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    //// May not work in AOL, also this is no good for a production app
    // 2) Define the email options
    const mailOptions = {
        from: "No Reply <no-reply@DukeOfGordonHotel.com>",
        to: options.email,
        subject: options.subject,
        html: options.html,
    };
    // 3) Actually send the email with nodemailer
    await transporter.sendMail(mailOptions);
};
exports.default = sendEmail;
//// emails currently sent to mailtrap.io
