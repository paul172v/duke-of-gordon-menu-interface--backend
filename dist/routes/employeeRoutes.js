"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const employeeAuthController_1 = require("../controllers/employeeAuthController");
const employeeController_1 = require("../controllers/employeeController");
//// Authentication Routes
router.route("/sign-up").post(employeeAuthController_1.employeeSignUp);
router.route("/login").post(employeeAuthController_1.employeeLogin);
router.route("/forgot-password").post(employeeAuthController_1.employeeForgotPassword);
router.route("/reset-password/:token").post(employeeAuthController_1.employeeResetPassword);
//// Set Employees Access Routes
router
    .route("/get-employees-access-list")
    .get((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager"), employeeController_1.getEmployeesAccessList);
router
    .route("/delete-employee/:id")
    .delete((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager"), employeeController_1.deleteOneEmployee);
router
    .route("/update-employee-access")
    .patch((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager"), employeeController_1.updateOneEmployeeRole);
//// General Routes for Postman
router
    .route("/get-all")
    .post((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), employeeController_1.getAllEmployees); /// Can restrict to specific roles. If no role is specified as arguments then all roles are allowed.
//// Get/Update User Routes
router
    .route("/get-user")
    .post((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), employeeController_1.getOneEmployeeByEmail);
router
    .route("/update-user")
    .patch((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), employeeController_1.updateOneEmployee);
router
    .route("/update-user-password")
    .patch((0, employeeAuthController_1.employeeProtectAndRestrictTo)("Manager", "Allowed"), employeeController_1.updateOneEmployeePassword);
exports.default = router;
