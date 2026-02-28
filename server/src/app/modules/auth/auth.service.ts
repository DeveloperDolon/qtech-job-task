import prisma from "#config/prisma.js";
import * as bcrypt from "bcryptjs";
import httpStatus from "http-status";
import type { Secret } from "jsonwebtoken";
import config from "#config/index.js";
import ApiError from "#app/errors/ApiError.js";
import { jwtHelpers } from "#app/helpers/jwtHelper.js";
import { sendEmailVerification, sendPasswordResetOTP } from "#app/utils/emailService.js";
import { generateOTP } from "#app/utils/generateOtp.js";
import { storeOTP, verifyOTP } from "../otp/otp.service.js";

const registerUser = async (payload: { email: string; firstName: string; lastName: string; password: string; phone?: string }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exists!");
  }

  const hashedPassword = await bcrypt.hash(payload.password, Number(config.salt_round));

  const otp = generateOTP();
  await storeOTP(payload.email, "email_verification", otp, 300); // 5 minutes

  await prisma.user.create({
    data: {
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      password: hashedPassword,
      phone: payload.phone ?? null,
    },
  });

  await sendEmailVerification(payload.email, otp);

  return { message: "Registration successful! Please verify your email." };
};

const verifyEmail = async (payload: { email: string; otp: string }) => {
  const isValidOTP = await verifyOTP(payload.email, "email_verification", payload.otp);

  if (!isValidOTP) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid or expired OTP!");
  }

  await prisma.user.update({
    where: { email: payload.email },
    data: { isEmailVerified: true },
  });

  return { message: "Email verified successfully!" };
};

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  if (!userData.isEmailVerified) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please verify your email first!");
  }

  const isCorrectPassword = await bcrypt.compare(payload.password, userData.password);

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password incorrect!");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      id: userData.id,
      email: userData.email,
    },
    config.jwt.jwt_access_secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      id: userData.id,
      email: userData.email,
    },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.refresh_token_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(token, config.jwt.jwt_refresh_secret as Secret);
  } catch (err) {
    throw new Error("You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email
    },
    config.jwt.jwt_access_secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(payload.oldPassword, userData.password);

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, Number(config.salt_round));

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  const otp = generateOTP();
  await storeOTP(payload.email, "password_reset", otp, 300); // 5 minutes

  await sendPasswordResetOTP(userData.email, otp);

  return { message: "Password reset OTP sent to your email!" };
};

const resetPassword = async (payload: { email: string; otp: string; newPassword: string }) => {
  const isValidOTP = await verifyOTP(payload.email, "password_reset", payload.otp);

  if (!isValidOTP) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid or expired OTP!");
  }

  const hashedPassword = await bcrypt.hash(payload.newPassword, Number(config.salt_round));

  await prisma.user.update({
    where: { email: payload.email },
    data: { password: hashedPassword },
  });

  return { message: "Password reset successfully!" };
};

const getMe = async (user: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      isEmailVerified: true,
      createdAt: true,
    },
  });

  return userData;
};

const resendOTP = async (payload: { email: string; purpose: "email_verification" | "password_reset" }) => {
  const userData = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  const otp = generateOTP();
  await storeOTP(payload.email, payload.purpose, otp, 300);

  if (payload.purpose === "email_verification") {
    await sendEmailVerification(payload.email, otp);
  } else {
    await sendPasswordResetOTP(payload.email, otp);
  }

  return { message: "OTP sent successfully!" };
};

export const AuthServices = {
  registerUser,
  verifyEmail,
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
  getMe,
  resendOTP,
};
