import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.utils";
import * as UserService from "../services/users.service";
export const registerUser = asyncHandler(async(req:Request, res:Response)=>{
    const user = req.body;
    const localFilePath:any = req.files;
    user.profileUrl = localFilePath.profile[0].path;
    await UserService.registerUser(user);
    res.status(200).json({
        message: "User created"
    })
})