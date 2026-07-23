import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = Router();


router.get("/", (req, res) => {
  res.json({
    service: "Welcome to the auth service",
    status: "Running"
  });
});

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.get("/me", authenticate, asyncHandler(authController.getProfile));
router.post("/forgot-password", asyncHandler(authController.forgotPassword));

export default router;