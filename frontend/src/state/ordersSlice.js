import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteOrder } from "../utils/api";

const initialState = {
  orders: [],
};

export const deleteOrderThunk = createAsyncThunk(
  "orders/delete",
  async (data) => {
    return deleteOrder(data);
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteOrderThunk.fulfilled, (state, action) => {
      const order = state.orders.find((h) => h._id === action.payload.data._id);
      const index = state.orders.findIndex(
        (h) => h._id === action.payload.data._id
      );
      if (!order) return;
      state.orders.splice(index, 1);
    });
  },
});

export const { getOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
