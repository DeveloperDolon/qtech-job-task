import type { ApiResponse } from "../../types";
import { baseApi } from "../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation<
      ApiResponse<{ token: string }>,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useAdminLoginMutation } = authApi;
