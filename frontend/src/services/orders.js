import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/orders/" }),
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ search, page, pageSize, sort }) => ({
        url: "/",
        pararms: { search, page, pageSize, sort },
      }),
    }),
    deleteOrder: builder.mutation({
      query: (body) => ({
        url: `/delete`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery, useDeleteOrderMutation } = orderApi;
