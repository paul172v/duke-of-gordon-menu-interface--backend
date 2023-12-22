import express from "express";

const router = express.Router();

import {
  signup,
  login,
  protectAndRestrictTo,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";

import {
  updateOneEmployee,
  getAllEmployees,
} from "../controllers/employeeController";

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/update/:id").patch(updateOneEmployee);
router.route("/forgot").post(forgotPassword);
router.route("/reset").post(resetPassword);
router.route("/get-all").post(protectAndRestrictTo("Manager"), getAllEmployees); /// Can restrict to specific roles. If no role is specified then all roles are allowed.

export default router;
