import { Request, Response, NextFunction } from "express";
import sgMail from "@sendgrid/mail";
import sendEmail from "../utils/portfolioEmail";

export const sendMeAnEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      await sendEmail({
        email: req.body.email,
        subject: req.body.subject,
        html,
      });

      res.status(200).json({
        status: "success",
        message: "Email has been sent",
      });
    } catch (err) {
      return next(
        res.status(500).json({
          status: "fail",
          message: "There was an error sending this email, try again later",
        })
      );
    }
  } catch (err: any) {
    res.status(500).json({
      status: "fail",
      message: err.message || "Internal server error",
    });
  }
};
