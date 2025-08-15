// types/division.type.ts
export interface IDivisionType {
  name: string;
  description: string;
  thumbnail: File; // required for file upload
}

export interface IDivisionTypeResponse {
  name: string;
  thumbnail: string;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}
