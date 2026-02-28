import express from "express";

const router = express.Router();

import { ApplicationController } from "./application.controller.js";
import { uploadMiddleware } from "#app/helpers/upload.js";
import validateRequest from "#app/middlewares/validateRequest.js";
import { ApplicationValidation } from "./application.validation.js";
import authGuard from "#app/middlewares/authGuard.js";

router.post("/", authGuard(),validateRequest(ApplicationValidation.applicationSchema), uploadMiddleware.single("file"), ApplicationController.createApplication);
router.get("/job/:jobId", authGuard(), ApplicationController.getApplicationsByJobId);
router.get("/", authGuard(), ApplicationController.getAllApplications);
router.delete("/:id", authGuard(), ApplicationController.deleteApplication);

export const ApplicationRoutes = router;
