import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.utils";

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
   res.status(error.statusCode || 500).json({
    message: error.message,
    success: false,
  });
};
