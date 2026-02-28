import express from "express";
import authGuard from "#app/middlewares/authGuard.js";
import validateRequest from "#app/middlewares/validateRequest.js";
import { AuthController } from "./auth.controller.js";
import { AuthValidation } from "./auth.validation.js";

const router = express.Router();

router.post("/register", validateRequest(AuthValidation.registerUser), AuthController.registerUser);

router.post("/verify-email", validateRequest(AuthValidation.verifyEmail), AuthController.verifyEmail);

router.post("/login", validateRequest(AuthValidation.loginUser), AuthController.loginUser);

router.post("/refresh-token", AuthController.refreshToken);

router.post("/change-password", authGuard(), validateRequest(AuthValidation.changePassword), AuthController.changePassword);

router.post("/forgot-password", validateRequest(AuthValidation.forgotPassword), AuthController.forgotPassword);

router.post("/reset-password", validateRequest(AuthValidation.resetPassword), AuthController.resetPassword);

router.post("/resend-otp", validateRequest(AuthValidation.resendOTP), AuthController.resendOTP);

router.get("/me", authGuard(), AuthController.getMe);

router.post("/logout", authGuard(), AuthController.logout);

export const AuthRoutes = router;
