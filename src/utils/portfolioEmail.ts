import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";

interface EmailOptions {
  email: string;
  subject: string;
  html: any;
}

const sendEmail = async ({
  email,
  subject,
  html,
}: {
  email: string;
  subject: string;
  html: string;
}) => {
  const msg = {
    to: "paul172v@aol.com", // Change to your recipient
    from: "donotreply172v@gmx.com", // <----- Verified sender
    subject: `(From portfolio) ${subject}`,
    html: html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error: any) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

export default sendEmail;

//// emails currently sent to mailtrap.io
