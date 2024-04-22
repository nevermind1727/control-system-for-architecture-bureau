import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const houseApi = createApi({
  reducerPath: "houseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/houses/" }),
  endpoints: (builder) => ({
    getAllHouses: builder.query({
      query: ({ page, pageSize, search }) => ({
        url: "/",
        params: { page, pageSize, search },
      }),
    }),
    createHouse: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
    }),
    deleteHouse: builder.mutation({
      query: (body) => ({
        url: `/delete`,
        method: "POST",
        body,
      }),
    }),
    updateHouse: builder.mutation({
      query: (body) => ({
        url: "/update",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllHousesQuery,
  useCreateHouseMutation,
  useDeleteHouseMutation,
  useUpdateHouseMutation,
} = houseApi;
