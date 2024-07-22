import { NextFunction, Response } from "express";
import HttpStatusCode from "http-status-codes";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.utils";
import config from "../config";
import { IUser } from "../interface/user.interface";
import { AuthRequest } from "../interface/auth.interface";
import loggerWithNameSpace from "../utils/logger.utils";

const logger = loggerWithNameSpace("Auth Middleware: ");
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // const {Bearer} = req.cookies;
  const { authorization } = req.headers;
  if (!authorization) {
    throw new ApiError(HttpStatusCode.UNAUTHORIZED, "Access token required");
  }
  const token = authorization.split(" ");
  if (token.length !== 2 || token[0] !== "Bearer") {
    return next(
      new ApiError(HttpStatusCode.UNAUTHORIZED, "Invalid access token")
    );
  }
  try {
    const payload = jwt.verify(
      token[1],
      config.jwt.access_token_secret!
    ) as IUser;
    req.user = {
        id: payload.id
    };
    next();
  } catch (error) {
    logger.error(error);
    throw new ApiError(HttpStatusCode.UNAUTHORIZED, "Invalid access token");
  }
};
