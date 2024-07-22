import prisma from "../db/prisma.db";
import { ChangePassword, IUser, UpdateUser } from "../interface/user.interface";

export const registerUser = (user: IUser) => {
  const { fullName, email, password, profileUrl, refreshToken, imagePublicId} = user;
  return prisma.users.create({
    data: {
      fullName,
      email,
      password,
      profileUrl,
      refreshToken,
      imagePublicId
    },
  });
};

export const getUserByEmail = (email: string) => {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
};

export const getUserById = (id: number) => {
  return prisma.users.findUnique({
    where: {
      id,
    },
  });
};

export const updateRefreshToken = (id: number, refreshToken: string) => {
  return prisma.users.update({
    data: {
      refreshToken,
    },
    where: {
      id,
    },
  });
};

export const logoutUser = (id: number) => {
  return prisma.users.update({
    data: {
      refreshToken: "",
    },
    where: {
      id,
    },
  });
};

export const changePassword = ({
  id,
  newPassword,
}: Pick<ChangePassword, "id" | "newPassword">) => {
  return prisma.users.update({
    data: {
      password: newPassword,
    },
    where: {
      id,
    },
  });
};

export const updateUser = ({ id, email, fullName }: UpdateUser) => {
  return prisma.users.update({
    data: {
      email,
      fullName,
    },
    where: {
      id,
    },
  });
};

export const updateUserProfile = (id: number, newUrl: string)=>{
  return prisma.users.update({
    data: {
      profileUrl:newUrl
    },
    where:{
      id,
    }
  })
}