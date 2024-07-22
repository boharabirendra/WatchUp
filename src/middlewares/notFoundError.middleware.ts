import { Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import { ApiError } from "../utils/ApiError.utils";

export const notFoundError = (req: Request, res: Response) => {
    return res.status(HttpStatusCode.NOT_FOUND).json(
        new ApiError(HttpStatusCode.NOT_FOUND, "Route/Path not found")
    );
}