import { IUser } from "../interface/user.interface";
import * as UserModel from "../models/users.models";
import { ApiError } from "../utils/ApiError.utils";
import { uploadOnCloudinary } from "../utils/cloudinary.utils";
import { generateHashedPassword } from "../utils/generateHashedPassword.utils";

import loggerWithNameSpace from "../utils/logger.utils";
export const registerUser = async (user: IUser) => {
  const existingUser = await UserModel.getUserByEmail(user.email);
  if (existingUser)
    throw new ApiError(
      409,
      `User with email {birendrabohara274@gmail.com} already exist.`
    );
  try {
    console.log(user.profileUrl);
    const profile = await uploadOnCloudinary(user.profileUrl);
    console.log(profile);
    // const password = await generateHashedPassword(user.password);
    // await UserModel.registerUser({ ...user, password });
  } catch (error) {
    const logger = loggerWithNameSpace(
      "Database operation failed, [User Service]: {fn: registerUser}"
    );
    logger.error(error);
    throw new ApiError(500, "Internal server error");
  }
};
