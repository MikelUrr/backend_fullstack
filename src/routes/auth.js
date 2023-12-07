import authController from "../controllers/authController.js";
import { Router } from "express";

const router = Router();


router.post("/", authController.login);
router.post("/end", authController.logout);

export default router;