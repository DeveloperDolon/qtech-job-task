/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // 1. Ensure the path matches your store configuration
      const token = (getState() as any).auth.token;

      // Debugging: Log this to your console to see if the token exists during the request
      // console.log("Current Token in State:", token);

      // 2. Only set the header if the token actually exists
      if (token && token !== "null" && token !== "undefined") {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Jobs", "Applications"],
  endpoints: () => ({}),
});