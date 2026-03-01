import type { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "#app/shared/catchAsync.js";
import sendResponse from "#app/shared/sendResponse.js";
import { AuthServices } from "./auth.service.js";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("accessToken", accessToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60, // 1 hour
  });

  res.cookie("refreshToken", refreshToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully!",
    data: { accessToken },
  });
});

export const AuthController = {
  loginUser,
};
