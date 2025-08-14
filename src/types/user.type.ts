// user.types.ts
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string; // optional for frontend
  role: "USER" | "GUILD" | "ADMIN" | "SUPER_ADMIN";
  isDeleted: boolean;
  isActive: "ACTIVE" | "INACTIVE";
  isVerified: boolean;
  auths: {
    provider: string;
    providerId: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
