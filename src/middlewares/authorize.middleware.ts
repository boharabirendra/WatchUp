import { NextFunction, Response } from "express";
import { AuthRequest } from "../interface/auth.interface";
import { ROLE } from "../constants/role.constants";
import { ForbiddenError } from "../errors/error.error";

export const authorize = (action: ROLE) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const { role } = req.user;
    if (action !== role) {
      return next(new ForbiddenError("Forbidden access"));
    }
    next();
  };
};
