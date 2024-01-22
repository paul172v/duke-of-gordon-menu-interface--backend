import express from "express";

const router = express.Router();

import {
  employeeSignUp,
  employeeLogin,
  employeeProtectAndRestrictTo,
  employeeForgotPassword,
  employeeResetPassword,
} from "../controllers/employeeAuthController";

import {
  updateOneEmployee,
  getAllEmployees,
  getEmployeesAccessList,
  deleteOneEmployee,
  updateOneEmployeeRole,
  getOneEmployeeByEmail,
  updateOneEmployeePassword,
} from "../controllers/employeeController";

//// Authentication Routes
router.route("/sign-up").post(employeeSignUp);
router.route("/login").post(employeeLogin);
router.route("/forgot-password").post(employeeForgotPassword);
router.route("/reset-password/:token").post(employeeResetPassword);

//// Set Employees Access Routes
router
  .route("/get-employees-access-list")
  .get(employeeProtectAndRestrictTo("Manager"), getEmployeesAccessList);
router
  .route("/delete-employee/:id")
  .delete(employeeProtectAndRestrictTo("Manager"), deleteOneEmployee);
router
  .route("/update-employee-access")
  .patch(employeeProtectAndRestrictTo("Manager"), updateOneEmployeeRole);

//// General Routes for Postman
router
  .route("/get-all")
  .post(employeeProtectAndRestrictTo("Manager", "Allowed"), getAllEmployees); /// Can restrict to specific roles. If no role is specified as arguments then all roles are allowed.
//// Get/Update User Routes
router
  .route("/get-user")
  .post(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    getOneEmployeeByEmail
  );
router
  .route("/update-user")
  .patch(employeeProtectAndRestrictTo("Manager", "Allowed"), updateOneEmployee);
router
  .route("/update-user-password")
  .patch(
    employeeProtectAndRestrictTo("Manager", "Allowed"),
    updateOneEmployeePassword
  );
export default router;
