import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const requestApi = createApi({
  reducerPath: "requestApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/requests/" }),
  endpoints: (builder) => ({
    getAllRequests: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    deleteRequest: builder.mutation({
      query: (body) => ({
        url: `/delete`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAllRequestsQuery, useDeleteRequestMutation } = requestApi;
