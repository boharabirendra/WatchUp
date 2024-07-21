import prisma from "../db/prisma.db";
import { IUser } from "../interface/user.interface";

export const registerUser = (user: IUser) =>{
    const {fullName, email, password, profileUrl, refreshToken} = user;
    return prisma.users.create({
        data: {
            fullName,
            email,
            password,
            profileUrl: profileUrl || "",
            refreshToken: refreshToken || ""
        }
    })
}

export const getUserByEmail = (email: string) =>{
    return prisma.users.findUnique({
        where:{
            email,
        },
        select: {
            id: true
        }
    })
}