import type { ComponentType } from "react";

// types/index.ts
export type { ISendOtp, ILogin, IRegister, IVerifyOtp } from "./auth.type";
export type { IUser } from "./user.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
