import { Request, Response } from "express";
import Employee from "../models/employeeModel";
import bcrypt from "bcryptjs";

export const getAll = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();

    res.status(200).json({
      status: "success",
      results: employees.length,
      payload: employees,
    });
  } catch (err: any) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id);

    res.status(200).json({
      status: "success",
      payload: employee,
    });
  } catch (err: any) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const updateOne = async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  try {
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
  } catch (err: any) {
    res.status(501).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.status(404).json({
      status: "success",
      message: "Employee removed successfully",
    });
  } catch (err: any) {
    res.status(501).json({
      status: "fail",
      message: err.message,
    });
  }
};
