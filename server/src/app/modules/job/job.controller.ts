import httpStatus from "http-status";
import type { Request, Response } from "express";
import catchAsync from "#app/shared/catchAsync.js";
import sendResponse from "#app/shared/sendResponse.js";
import { JobService } from "./job.service.js";

const createJob = catchAsync(async (req: Request, res: Response) => {
  const job = await JobService.createJob(req.body, req.file as Express.Multer.File);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Job created successfully",
    data: job,
  });
});

const deleteJob = catchAsync(async (req: Request, res: Response) => {
  const job = await JobService.deleteJob(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Job deleted successfully",
    data: job,
  });
});

const getAllJobs = catchAsync(async (req: Request, res: Response) => {
  const jobs = await JobService.getAllJobs(req.query as { search: string; category?: string; jobType?: string });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Jobs retrieved successfully",
    data: jobs,
  });
});

const getJobById = catchAsync(async (req: Request, res: Response) => {
  const job = await JobService.getJobById(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Job retrieved successfully",
    data: job,
  });
});

export const JobController = {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
};
