import { Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler.utils";
import * as UserService from "../services/users.service";
import { ApiResponse } from "../utils/ApiResponse.utils";
import { cookiesOptions } from "../utils/cookiesOption.utils";
import { AuthRequest } from "../interface/auth.interface";

/**Register user */
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.body;
    const localFilePath: any = req.files;
    if(localFilePath.profile){
      user.profileUrl = localFilePath.profile[0].path;
    }
    await UserService.registerUser(user);
    res
      .status(HttpStatusCode.OK)
      .json(new ApiResponse("User created successfully"));
  }
);

/**Login user */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const loginCredentials = req.body;
  const { accessToken, refreshToken } = 
    await UserService.loginUser(loginCredentials);
  res
    .status(HttpStatusCode.OK)
    .cookie("Bearer ", accessToken, cookiesOptions)
    .cookie("RefreshToken", refreshToken, cookiesOptions)
    .json(
      new ApiResponse("User logged In Successfully", {
        accessToken,
        refreshToken,
      })
    );
});

/**Change password */
export const changePassword = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const {id} = req.user;
    console.log({ id, oldPassword, newPassword });
    await UserService.changePassword({ id, oldPassword, newPassword });
    res
      .status(HttpStatusCode.OK)
      .json(new ApiResponse("Password successfully changed."));
  }
);



/**Logout user */
export const logoutUser = asyncHandler(async(req:AuthRequest, res:Response)=>{
    const {id} = req.user;
    await UserService.logoutUser(id);
    res
    .status(HttpStatusCode.OK)
    .json(new ApiResponse("User logged out successfully"));
});


/**Update user */
export const updateUser = asyncHandler(async(req: AuthRequest, res: Response)=>{
  const {fullName, email} = req.body;
  const {id} = req.user;
  await UserService.updateUser({id, fullName, email});
  res.status(HttpStatusCode.OK).json(
    new ApiResponse("User updated successfully")
  )
})