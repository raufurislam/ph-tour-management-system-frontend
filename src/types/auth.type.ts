// auth.type.ts
export interface ISendOtp {
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}
