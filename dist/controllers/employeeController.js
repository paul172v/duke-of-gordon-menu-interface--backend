"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOneEmployeeExample = exports.updateOneEmployeePassword = exports.updateOneEmployeeRole = exports.getEmployeesAccessList = exports.deleteOneEmployee = exports.updateOneEmployee = exports.getOneEmployeeByEmail = exports.getAllEmployees = void 0;
const employeeModel_1 = __importDefault(require("../models/employeeModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const handlerFactory_1 = require("./handlerFactory");
exports.getAllEmployees = (0, handlerFactory_1.factoryGetAll)(employeeModel_1.default);
exports.getOneEmployeeByEmail = (0, handlerFactory_1.factoryGetOneByEmail)(employeeModel_1.default);
exports.updateOneEmployee = (0, catchAsync_1.default)(async (req, res) => {
    let updateFields = {
        ...(req.body.firstName && { firstName: req.body.firstName }),
        ...(req.body.middleName
            ? { middleName: req.body.middleName }
            : { middleName: null }),
        ...(req.body.lastName && { lastName: req.body.lastName }),
        ...(req.body.email && { email: req.body.email }),
    };
    const updatedEmployee = await employeeModel_1.default.findByIdAndUpdate(req.body.id, updateFields);
    updatedEmployee === null || updatedEmployee === void 0 ? void 0 : updatedEmployee.save();
    res.status(200).json({
        status: "success",
        message: "User updated successfully",
    });
});
exports.deleteOneEmployee = (0, handlerFactory_1.factoryDeleteOne)(employeeModel_1.default);
exports.getEmployeesAccessList = (0, catchAsync_1.default)(async (req, res) => {
    const employees = await employeeModel_1.default.find().select("firstName middleName lastName email role");
    res.status(200).json({
        status: "success",
        payload: { employees },
    });
});
exports.updateOneEmployeeRole = (0, catchAsync_1.default)(async (req, res) => {
    await employeeModel_1.default.findByIdAndUpdate(req.body.id, {
        role: req.body.role,
    });
    res.status(200).json({
        status: "success",
        message: "Employee role updated successfully",
    });
});
exports.updateOneEmployeePassword = (0, catchAsync_1.default)(async (req, res) => {
    const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 12);
    await employeeModel_1.default.findByIdAndUpdate(req.body.id, {
        password: hashedPassword,
        passwordChangedAt: new Date(),
    });
    res.status(200).json({
        status: "success",
        message: "Employee role updated successfully",
    });
});
exports.updateOneEmployeeExample = (0, catchAsync_1.default)(async (req, res) => {
    const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 12);
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
    const updatedEmployee = await employeeModel_1.default.findByIdAndUpdate(req.params.id, updateFields);
    updatedEmployee === null || updatedEmployee === void 0 ? void 0 : updatedEmployee.save();
    res.status(201).json({
        status: "success",
        message: "Employee updated successfully",
        payload: updatedEmployee,
    });
});
