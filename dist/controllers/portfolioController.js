"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMeAnEmail = void 0;
const email_1 = __importDefault(require("../utils/email"));
const sendMeAnEmail = async (req, res, next) => {
    try {
        //  Construct HTML content with inline CSS
        const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>This email was sent through your portfolio contact form</title>
          <p>From: ${req.body.name} at ${req.body.email}</p>
          <style>
              /* Add your CSS here */
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              title {font-weight: 700}
              p { color: #555; }
          </style>
      </head>
      <body>
          ${req.body.message}
      </body>
      </html>
      `;
        try {
            await (0, email_1.default)({
                email: req.body.email,
                subject: req.body.subject,
                html,
            });
            res.status(200).json({
                status: "success",
                message: "Email has been sent",
            });
        }
        catch (err) {
            return next(res.status(500).json({
                status: "fail",
                message: "There was an error sending this email, try again later",
            }));
        }
    }
    catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message || "Internal server error",
        });
    }
};
exports.sendMeAnEmail = sendMeAnEmail;
