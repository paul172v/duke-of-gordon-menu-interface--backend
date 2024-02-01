import express from "express";

import { sendMeAnEmail } from "../controllers/portfolioController";

const router = express.Router();

router.route("/send-email").post(sendMeAnEmail);

export default router;
