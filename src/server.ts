import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import app from "./app";
import mongoose from "mongoose";
import sgMail from "@sendgrid/mail";

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
mongoose
  .connect(db)
  .then(() => console.log("Connected to database"))
  .catch((err: Error) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

process.on("unhandledRejection", (err) => {
  console.log(`❗Unhandled Rejection! Shutting down!`);
  console.log(`❌ ${err}`);
  server.close(() => {
    process.exit(1);
  });
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
