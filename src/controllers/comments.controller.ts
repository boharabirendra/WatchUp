import { Response } from "express";
import HttpStatusCode from "http-status-codes";
import { AuthRequest } from "../interface/auth.interface";
import * as CommentServce from "../services/comments.service";
import { catchAsyncError } from "../utils/catchError.utils";
import { ApiResponse } from "../utils/ApiResponse.utils";

export const createComment = catchAsyncError(async(req: AuthRequest, res: Response)=>{
    const {id: userId} = req.user;
    const {id} = req.params;
    const videoId = Number(id);
    const {title, description} = req.body;
    await CommentServce.createComment({title, description, userId, videoId})
    res.status(HttpStatusCode.OK).json(
        new ApiResponse("Comment added successfully")
    )
})