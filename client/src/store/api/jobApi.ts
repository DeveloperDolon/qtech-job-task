import type { ApiResponse, Job, JobsQuery } from "../../types";
import { baseApi } from "../api/baseApi";

export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Jobs
    getJobs: builder.query<ApiResponse<Job[]>, JobsQuery>({
      query: (params) => ({
        url: "/jobs",
        params,
      }),
      providesTags: ["Jobs"],
    }),

    getJobById: builder.query<ApiResponse<Job>, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Jobs", id }],
    }),

    createJob: builder.mutation<ApiResponse<Job>, FormData>({
      query: (formData) => ({
        url: "/jobs",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Jobs"],
    }),

    deleteJob: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useDeleteJobMutation,
} = jobApi;
