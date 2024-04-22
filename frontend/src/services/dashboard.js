import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/dashboard/" }),
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/",
      }),
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
