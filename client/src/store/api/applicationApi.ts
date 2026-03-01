import type { ApiResponse, Application } from "../../types";
import { baseApi } from "../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Applications
    createApplication: builder.mutation<ApiResponse<Application>, Application>({
      query: (payload) => ({
        url: "/applications",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Applications"],
    }),

    getApplicationsByJob: builder.query<ApiResponse<Application[]>, string>({
      query: (jobId) => `/applications/job/${jobId}`,
      providesTags: ["Applications"],
    }),

    getAllApplications: builder.query<
      ApiResponse<Application[]>,
      { search?: string }
    >({
      query: (params) => ({
        url: "/applications",
        params,
      }),
      providesTags: ["Applications"],
    }),

    deleteApplication: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applications"],
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useGetApplicationsByJobQuery,
  useGetAllApplicationsQuery,
  useDeleteApplicationMutation,
} = authApi;
