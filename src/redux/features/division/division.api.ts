// auth.api.ts
import { baseApi } from "@/redux/baseApi";
import type { IDivisionTypeResponse, IResponse } from "@/types";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation<IResponse<IDivisionTypeResponse>, FormData>({
      query: (divisionData) => ({
        url: "/division/create",
        method: "POST",
        data: divisionData,
      }),
      invalidatesTags: ["DIVISION"],
    }),

    getDivisions: builder.query({
      query: (params) => ({
        url: "/division",
        method: "GET",
        params: params,
      }),
      providesTags: ["DIVISION"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useAddDivisionMutation, useGetDivisionsQuery } = divisionApi;
