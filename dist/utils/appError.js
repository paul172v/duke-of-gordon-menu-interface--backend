"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
/*
  captureStackTrace returns a string that represents the location of that particular error in the call. It gives us a stack that helps us to find the location of that error in the code at which new Error() was Called. this will help us to find the exact error in our code.
  */
