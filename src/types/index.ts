// types/index.ts
export type { ISendOtp, ILogin, IRegister } from "./auth.type";
export type { IUser } from "./user.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
