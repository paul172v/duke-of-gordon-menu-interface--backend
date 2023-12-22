import { Request, Response } from "express";
import Employee from "../models/employeeModel";
import bcrypt from "bcryptjs";
import catchAsync from "../utils/catchAsync";

import {
  factoryGetAll,
  factoryGetOne,
  factoryDeleteOne,
} from "./handlerFactory";

export const getAllEmployees = factoryGetAll(Employee);

export const getOneEmployee = factoryGetOne(Employee);

export const updateOneEmployee = () => {
  catchAsync(async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
      passwordChangedAt: new Date(),
    });

    updatedEmployee?.save();

    res.status(201).json({
      status: "success",
      message: "Employee updated successfully",
      payload: updatedEmployee,
    });
  });
};

export const deleteOneEmployee = factoryDeleteOne(Employee);
