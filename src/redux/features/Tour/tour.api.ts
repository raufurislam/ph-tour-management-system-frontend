// auth.api.ts
import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourType, ITourTypeResponse } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // addTourType: builder.mutation<IResponse<IUser>, ILogin>({
    addTourType: builder.mutation<IResponse<ITourTypeResponse>, ITourType>({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOUR"],
    }),

    removeTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE",
        data: tourTypeId,
      }),
      invalidatesTags: ["TOUR"],
    }),

    getTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useAddTourTypeMutation,
  useRemoveTourTypeMutation,
  useGetTourTypesQuery,
} = tourApi;
