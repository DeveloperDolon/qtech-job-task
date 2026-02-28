import type { Request, Response } from "express";
import httpStatus from "http-status";
import { ApplicationService } from "./application.service.js";
import catchAsync from "#app/shared/catchAsync.js";
import sendResponse from "#app/shared/sendResponse.js";

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const application = await ApplicationService.createApplication(req.body, req.file as Express.Multer.File);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Application submitted successfully",
    data: application,
  });
});

const getApplicationsByJobId = catchAsync(async (req: Request, res: Response) => {
  const applications = await ApplicationService.getApplicationsByJobId(req.params.jobId as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Applications retrieved successfully",
    data: applications,
  });
});

const getAllApplications = catchAsync(async (req: Request, res: Response) => {
  const applications = await ApplicationService.getAllApplications(req.query as { search: string });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Applications retrieved successfully",
    data: applications,
  });
});

const deleteApplication = catchAsync(async (req: Request, res: Response) => {
  const application = await ApplicationService.deleteApplication(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Application deleted successfully",
    data: application,
  });
});

export const ApplicationController = {
  createApplication,
  getApplicationsByJobId,
  getAllApplications,
  deleteApplication,
};
