import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/appError";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Set Security HTTP Headers
app.use(helmet());

app.use(express.json({ limit: "10kb" }));

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS (Cross-Site Scripting Attacks)
app.use(xss());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Limit requests from same IP
const limiter = rateLimit({
  // Max requests from the same IP per time window
  max: 100, /// ⚠️ Should be 100 but extended for testing purposes ⚠️
  // WindowM (M for milliseconds), converted to 1 hour
  windowMs: 60 * 60 * 1000,
  // Error Message
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

import employeeRouter from "./routes/employeeRoutes";
import mainMenuRouter from "./routes/mainMenuRoutes";

app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/main-menu", mainMenuRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
