import express from "express";

const router = express.Router();

import {
  signup,
  login,
  protectAndRestrictTo,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";

import { updateOne } from "../controllers/employeeController";

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/protect").post(protectAndRestrictTo("Manager")); /// Can restrict to specific roles. If no role is specified then all roles are allowed.
router.route("/update/:id").patch(updateOne);
router.route("/forgot").post(forgotPassword);
router.route("/reset").post(resetPassword);

export default router;
