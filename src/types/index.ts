import type { ComponentType } from "react";

// types/index.ts
export type { ISendOtp, ILogin, IRegister, IVerifyOtp } from "./auth.type";
export type { IUser } from "./user.type";
export type { ITourType, ITourTypeResponse, ITourPackage } from "./tour.type";
export type { IDivisionType, IDivisionTypeResponse } from "./division.type";

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

type ErrorSource = {
  path: string;
  message: string;
};

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "GUILD";
