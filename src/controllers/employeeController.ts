import { Request, Response } from "express";
import Employee from "../models/employeeModel";
import bcrypt from "bcryptjs";
import catchAsync from "../utils/catchAsync";

import {
  factoryGetAll,
  factoryGetOneByEmail,
  factoryDeleteOne,
} from "./handlerFactory";

export const getAllEmployees = factoryGetAll(Employee);

export const getOneEmployeeByEmail = factoryGetOneByEmail(Employee);

export const updateOneEmployee = catchAsync(
  async (req: Request, res: Response) => {
    let updateFields = {
      ...(req.body.firstName && { firstName: req.body.firstName }),
      ...(req.body.middleName
        ? { middleName: req.body.middleName }
        : { middleName: null }),
      ...(req.body.lastName && { lastName: req.body.lastName }),
      ...(req.body.email && { email: req.body.email }),
    };

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.body.id,
      updateFields
    );

    updatedEmployee?.save();

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
    });
  }
);

export const deleteOneEmployee = factoryDeleteOne(Employee);

export const getEmployeesAccessList = catchAsync(
  async (req: Request, res: Response) => {
    const employees = await Employee.find().select(
      "firstName middleName lastName email role"
    );

    res.status(200).json({
      status: "success",
      payload: { employees },
    });
  }
);

export const updateOneEmployeeRole = catchAsync(
  async (req: Request, res: Response) => {
    await Employee.findByIdAndUpdate(req.body.id, {
      role: req.body.role,
    });

    res.status(200).json({
      status: "success",
      message: "Employee role updated successfully",
    });
  }
);

export const updateOneEmployeePassword = catchAsync(
  async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    await Employee.findByIdAndUpdate(req.body.id, {
      password: hashedPassword,
      passwordChangedAt: new Date(),
    });

    res.status(200).json({
      status: "success",
      message: "Employee role updated successfully",
    });
  }
);

export const updateOneEmployeeExample = catchAsync(
  async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    let updateFields = {
      ...(req.body.firstName && { firstName: req.body.firstName }),
      ...(req.body.middleName && { middleName: req.body.middleName }),
      ...(req.body.lastName && { lastName: req.body.lastName }),
      ...(req.body.email && { email: req.body.email }),
      ...(req.body.role && { role: req.body.role }),
      ...(req.body.password && {
        password: hashedPassword,
        passwordChangedAt: new Date(),
      }),
    };

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateFields
    );

    updatedEmployee?.save();

    res.status(201).json({
      status: "success",
      message: "Employee updated successfully",
      payload: updatedEmployee,
    });
  }
);
