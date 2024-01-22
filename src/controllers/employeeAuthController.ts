import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import jwt from "jsonwebtoken";
import Employee from "../models/employeeModel";
import sendEmail from "../utils/email";
import bcrypt from "bcryptjs";

//// ✅ Signup appears to be working
export const employeeSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const newEmployee = await new Employee({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    await newEmployee.save({ validateBeforeSave: true });

    const token = jwt.sign(
      { employeeId: newEmployee._id },
      process.env.JWT_SECRET as string
    );

    res.status(201).json({
      status: "success",
      message: "Employee successfully created",
      email: newEmployee.email,
      role: newEmployee.role,
      token: token,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "fail",
      message: "There was an error creating the employee",
    });
  }
};

////////// ✅ Login appears to be working
export const employeeLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //// Document.find() always returns an array so we need to make sure "employee" is just a single document so as not to cause errors.
    const employeeArr = await Employee.find({ email: req.body.email });
    const employee = employeeArr[0];

    if (!employee) {
      return res.status(404).json({
        status: "fail",
        message: "Could not find employee associated with this email address",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      employee.password
    );

    if (!validPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { employeeId: employee._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({
      status: "success",
      message: "Logged in successfully",
      role: employee.role,
      email: employee.email,
      token,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

////////// ✅ Protect and restrict to
export const employeeProtectAndRestrictTo = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1) Get token and check if it exists
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        const placeholder = req.headers.authorization.split("Bearer ");
        token = placeholder[1];
      }

      if (!token) {
        return next(
          res.status(401).json({
            status: "fail",
            message: "No token, you are not logged in",
          })
        );
      }

      // 2) Function to verify token and return a promise if okay
      const verifyToken = (token: string): Promise<any> => {
        return new Promise((resolve, reject) => {
          jwt.verify(
            token,
            process.env.JWT_SECRET as string,
            (err, decodedToken) => {
              if (err) {
                reject(err);
              } else {
                resolve(decodedToken);
              }
            }
          );
        });
      };

      const decoded = await verifyToken(token);

      // 3) Check if employee still exists
      const currentEmployee = await Employee.findById(
        JSON.stringify(decoded.employeeId) //// It is important that we stringify the data here
      );

      if (!currentEmployee) {
        console.log("❌ Employee belonging to token not found");
        return res.status(401).json({
          status: "fail",
          message:
            "Employee belonging to token not found, you are not logged in",
        });
      }

      // 4) Check if employee changed password after token was issued
      if (currentEmployee.changedPasswordAfter(decoded.iat)) {
        return next(
          res.status(401).json({
            status: "fail",
            message:
              "Password changed after token assigned, you are not logged in",
          })
        );
      }

      // 5: Conditional) Check if user's role matches the specified restricted roles. If no roles are specified then this step is skipped.
      if (roles.length > 0 && !roles.includes(currentEmployee.role)) {
        return next(
          res.status(403).json({
            status: "fail",
            message: "You do not have permission to perform this action",
          })
        );
      }
    } catch (err: any) {
      console.log(err.message);

      if (err.message === "Invalid signature") {
        console.log("❌ 401: Invalid signature, you are not logged in");
        return next(
          res.status(401).json({
            status: "fail",
            message: "Invalid signature, you are not logged in",
          })
        );
      }

      /* Both config.env and document.cookies (in React) should be set with expiry timer */
      /* Remember when changing JWT_EXPIRES_IN, server must be reset for changes to take effect */
      if (err.message === "jwt expired") {
        return next(
          res.status(401).json({
            status: "fail",
            message: "JWT expired, you are not logged in",
          })
        );
      }
    }

    ///// Upon successful completion of this controller, move onto the next controller in the route
    next();
  };
};

////////// ✅ Forgot Password is working, will send email with reset token
export const employeeForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) Get user based on POSTed email
    const employee = await Employee.findOne({ email: req.body.email });
    if (!employee) {
      return next(
        res.status(404).json({
          status: "fail",
          message: "No employee found with this email, token could not be sent",
        })
      );
    }

    // 2) Generate random token
    const resetToken = employee.createPasswordResetToken();
    await employee.save({ validateBeforeSave: false });

    // 3) Construct reset URL and HTML content with inline CSS
    const resetUrl = `${req.protocol}://localhost:5173/reset-password/${resetToken}`;
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Password Reset</title>
        <style>
            /* Add your CSS here */
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            a { color: #007bff; text-decoration: none; }
            p { color: #555; }
        </style>
    </head>
    <body>
        <p>Hello,</p>
        <p>If you requested a password reset, please follow the link below:</p>
        <a href="${resetUrl}">Reset Your Password</a>
        <p>If you did not request a password reset, please ignore this email or contact support.</p>
        <p>Thank you!</p>
    </body>
    </html>
    `;

    try {
      await sendEmail({
        email: employee.email,
        subject: "Your password reset token (valid for 10mins)",
        html,
      });

      res.status(200).json({
        status: "success",
        message: "Token sent to email",
      });
    } catch (err) {
      // Reset the token and expiration on failure
      employee.passwordResetToken = undefined;
      employee.passwordResetExpires = undefined;
      await employee.save({ validateBeforeSave: false });

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

////////// ✅ Reset password is working, token must be included in the body
export const employeeResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) Get employee based on the token, check if token has expired
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const employee = await Employee.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) Set password but only if there is a employee
    if (!employee) {
      console.log("❌ Token is invalid or token has expired");
      return next(
        res.status(400).json({
          status: "fail",
          message: "Token is invalid or token has expired",
        })
      );
    }

    employee.password = req.body.password;
    employee.passwordResetToken = undefined;
    employee.passwordResetExpires = undefined;

    // 3) Update changedPasswordAt property for current employee
    employee.passwordChangedAt = new Date(Date.now());
    await employee.save({ validateBeforeSave: false });

    // 4) Log the employee in, send JWT to client
    const token = jwt.sign(
      { id: employee._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Employee is logged in",
      token,
      payload: employee,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
