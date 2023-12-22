class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;

/*
  captureStackTrace returns a string that represents the location of that particular error in the call. It gives us a stack that helps us to find the location of that error in the code at which new Error() was Called. this will help us to find the exact error in our code.
  */
