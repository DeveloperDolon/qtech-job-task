import express from "express";
import authGuard from "#app/middlewares/authGuard.js";
import validateRequest from "#app/middlewares/validateRequest.js";
import { AuthController } from "./auth.controller.js";
import { AuthValidation } from "./auth.validation.js";

const router = express.Router();

router.post("/login", validateRequest(AuthValidation.loginUser), AuthController.loginUser);


export const AuthRoutes = router;
