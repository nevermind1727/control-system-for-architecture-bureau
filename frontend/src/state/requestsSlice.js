import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest } from "../utils/api";

const initialState = {
  requests: [],
};

export const deleteRequestThunk = createAsyncThunk(
  "requests/delete",
  async (data) => {
    return deleteRequest(data);
  }
);

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    getRequests: (state, action) => {
      state.requests = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteRequestThunk.fulfilled, (state, action) => {
      const request = state.requests.find(
        (h) => h._id === action.payload.data._id
      );
      const index = state.requests.findIndex(
        (h) => h._id === action.payload.data._id
      );
      if (!request) return;
      state.requests.splice(index, 1);
    });
  },
});

export const { getRequests } = requestsSlice.actions;

export default requestsSlice.reducer;
