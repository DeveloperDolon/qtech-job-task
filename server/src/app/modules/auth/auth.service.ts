import prisma from "#config/prisma.js";
import * as bcrypt from "bcryptjs";
import httpStatus from "http-status";
import type { Secret } from "jsonwebtoken";
import config from "#config/index.js";
import ApiError from "#app/errors/ApiError.js";
import { jwtHelpers } from "#app/helpers/jwtHelper.js";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
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

export const AuthServices = {
  loginUser,
};
