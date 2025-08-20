// auth.api.ts
import { baseApi } from "@/redux/baseApi";
import type {
  IResponse,
  ITourPackage,
  ITourType,
  ITourTypeResponse,
} from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // addTourType: builder.mutation<IResponse<IUser>, ILogin>({
    addTour: builder.mutation({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),
      invalidatesTags: ["TOUR"],
    }),

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

    getAllTours: builder.query<ITourPackage[], unknown>({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params: params,
      }),
      providesTags: ["TOUR"],
      transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
    }),
  }),
});

export const {
  useAddTourTypeMutation,
  useRemoveTourTypeMutation,
  useGetTourTypesQuery,
  useAddTourMutation,
  useGetAllToursQuery,
} = tourApi;
