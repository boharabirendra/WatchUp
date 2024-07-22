import bcryptjs from "bcryptjs";
import HttpStatusCode from "http-status-codes";
import {
  ChangePassword,
  IUser,
  LoginCredentials,
  UserArgs,
  UpdateUser
} from "../interface/user.interface";
import * as UserModel from "../models/users.models";
import { ApiError } from "../utils/ApiError.utils";
import { uploadOnCloudinary } from "../utils/cloudinary.utils";
import { generateHashedPassword } from "../utils/generateHashedPassword.utils";
import loggerWithNameSpace from "../utils/logger.utils";

const logger = loggerWithNameSpace(
  "Database operation failed, [User Service]:"
);
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.utils";

/**register user */
export const registerUser = async (user: IUser) => {
  if (await isUserExists({email: user.email}))
    throw new ApiError(
      HttpStatusCode.CONFLICT,
      `User with email {${user.email}} already exist.`
    );
  try {
    /**Upload user profile on Cloudinary */
    let profile;
    if(user.profileUrl){
      profile = await uploadOnCloudinary(user.profileUrl);
    }
    const password = await generateHashedPassword(user.password);
    await UserModel.registerUser({
      ...user,
      password,
      refreshToken: "",
      profileUrl: profile? profile.secure_url : "",
      imagePublicId: profile? profile.public_id : ""
    });
  } catch (error) {
    logger.error(error);
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
};

/**login user */
export const loginUser = async ({ email, password }: LoginCredentials) => {
  const existingUser = await isUserExists({email});
  if (!existingUser)
    throw new ApiError(
      HttpStatusCode.NOT_FOUND,
      `User with email {${email} does not exists.}`
    );
  if (!(await isPasswordValid(password, existingUser.password)))
    throw new ApiError(HttpStatusCode.UNAUTHORIZED, "Invalid password");
  const payload = {
    id: existingUser.id,
    fullName: existingUser.fullName,
    email: existingUser.email,
  };
  try {
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    await updateRefreshToken(existingUser.id, refreshToken);
    return { accessToken, refreshToken };
  } catch (error) {
    logger.error(error);
    throw new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Login failed.");
  }
};

export const changePassword = async ({
  id,
  oldPassword,
  newPassword,
}: ChangePassword) => {
  const existingUser = await isUserExists({id});
  if (!existingUser) throw new ApiError(HttpStatusCode.NOT_FOUND, "User does not exists.");
  if(await isPasswordValid(oldPassword, existingUser.password))
    throw new ApiError(HttpStatusCode.BAD_REQUEST, "Invalid old password");
  const password = await generateHashedPassword(newPassword);
  try {
    await UserModel.changePassword({ id, newPassword: password });
  } catch (error) {
    logger.error(error);
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "Password changed failed."
    );
  }
};

export const logoutUser = async (id: number) => {
  try {
    await UserModel.logoutUser(id);
  } catch (error) {
    logger.error(error);
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "Fail to logout user"
    );
  }
};

/**update refresh token */
export const updateRefreshToken = async (id: number, refreshToken: string) => {
  try {
    await UserModel.updateRefreshToken(id, refreshToken);
  } catch (error) {
    logger.error(error);
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "Fail to update refresh token"
    );
  }
};

/**Update user */
export const updateUser = async({id, fullName, email}: UpdateUser) =>{
  const existingUser = await isUserExists({email});
  if(existingUser) throw new ApiError(HttpStatusCode.CONFLICT, `Email {${email}} is already exists.`);
  await UserModel.updateUser({id, email, fullName});
}

const isPasswordValid = (plainPassword: string, hashedPassword: string) => {
  return bcryptjs.compare(plainPassword, hashedPassword);
};

const isUserExists = async (args: UserArgs) => {
  try {
    const {id, email} = args;
    if (id) {
      return await UserModel.getUserById(id);
    }
    if (email) {
      return await UserModel.getUserByEmail(email);
    }
  } catch (error) {
    logger.error(error);
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "Fail to get user data"
    );
  }
};
