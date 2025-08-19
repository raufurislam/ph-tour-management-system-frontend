// tour.type.ts
export interface ITourType {
  name: string;
}

export interface ITourTypeResponse {
  name: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITourPackage {
  _id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  arrivalLocation: string;
  departureLocation: string;
  location: string;
  description: string;
  costFrom: number;
  maxGuest: number;
  minAge: number;
  division: string;
  tourType: string;
  amenities: string[];
  included: string[];
  excluded: string[];
  tourPlan: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}
