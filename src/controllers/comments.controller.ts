import { Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import { AuthRequest } from "../interface/auth.interface";
import * as CommentServce from "../services/comments.service";
import { catchAsyncError } from "../utils/catchError.utils";
import { ApiResponse } from "../utils/ApiResponse.utils";

export const createComment = catchAsyncError(
  async (req: AuthRequest, res: Response) => {
    const { id: userId } = req.user;
    const { text, videoId } = req.body;
    await CommentServce.createComment({ text, userId, videoId });
    res
      .status(HttpStatusCode.OK)
      .json(new ApiResponse("Comment added successfully"));
  }
);


export const getComments = catchAsyncError(
  async (req: Request, res: Response) => {
    const { videoId } = req.params;
    const comments = await CommentServce.getComments(Number(videoId));
    res
      .status(HttpStatusCode.OK)
      .json(new ApiResponse("Comments list", comments));
  }
);
