export interface IUser {
  id?: number;
  fullName: string;
  email: string;
  password: string;
  profileUrl: string;
  imagePublicId: string;
  refreshToken: string;
}

export type LoginCredentials = Pick<IUser, "email" | "password">;
export type UpdateUser = Pick<IUser, "id" | "email" | "fullName">;
export type ChangePassword = {
  id: number;
  newPassword: string;
  oldPassword: string;
};


export type UserArgs = {
  id?: number;
  email?: string;
}