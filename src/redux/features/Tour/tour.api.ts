// auth.api.ts
import { baseApi } from "@/redux/baseApi";
import type { ILogin, IResponse, IUser } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation<IResponse<IUser>, ILogin>({
      query: (tourTypeName) => ({
        url: "/auth/login",
        method: "POST",
        data: tourTypeName,
      }),
    }),

    getTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetTourTypesQuery } = tourApi;
