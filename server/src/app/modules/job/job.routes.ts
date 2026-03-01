import express from "express";
import { JobController } from "./job.controller.js";
import { uploadMiddleware } from "#app/helpers/upload.js";
import authGuard from "#app/middlewares/authGuard.js";
import validateRequest from "#app/middlewares/validateRequest.js";
import { JobValidation } from "./job.validation.js";

const router = express.Router();

router.post(
  "/",
  authGuard(),
  uploadMiddleware.single("logo"), // ✅ parse multipart first
  (req, res, next) => {
    console.log("--- DEBUG START ---");
    console.log("File:", req.file);
    console.log("Body:", req.body);
    console.log("--- DEBUG END ---");
    next();
  },
  validateRequest(JobValidation.jobSchema), // ✅ now body exists
  JobController.createJob,
);
router.delete("/:id", authGuard(), JobController.deleteJob);

router.get("/", JobController.getAllJobs);

export const JobRoutes = router;
