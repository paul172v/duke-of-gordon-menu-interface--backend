import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import app from "./app";
import mongoose from "mongoose";

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
app.listen(port, () => console.log(`Listening on port ${port}`));
