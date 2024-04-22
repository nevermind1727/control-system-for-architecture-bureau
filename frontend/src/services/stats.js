import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/stats/" }),
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => ({
        url: "/",
      }),
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;
