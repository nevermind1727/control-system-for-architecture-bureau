import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteHouse } from "../utils/api";

const initialState = {
  houses: [],
};

export const deleteHouseThunk = createAsyncThunk(
  "houses/delete",
  async (data) => {
    return deleteHouse(data);
  }
);

const housesSlice = createSlice({
  name: "houses",
  initialState,
  reducers: {
    addHouse: (state, action) => {
      state.houses.unshift(action.payload.data);
    },
    getHouses: (state, action) => {
      state.houses = action.payload;
    },
    deleteHouseState: (state, action) => {
      const house = state.houses.find((h) => h._id === action.payload);
      const index = state.houses.findIndex((h) => h._id === action.payload);
      if (!house) return;
      state.houses.splice(index, 1);
    },
    updateHouseState: (state, action) => {
      const house = action.payload;
      const index = state.houses.findIndex((h) => h._id === house._id);
      state.houses.splice(index, 1);
      state.houses.unshift(house);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteHouseThunk.fulfilled, (state, action) => {
      const house = state.houses.find((h) => h._id === action.payload.data._id);
      const index = state.houses.findIndex(
        (h) => h._id === action.payload.data._id
      );
      if (!house) return;
      state.houses.splice(index, 1);
    });
  },
});

export const { addHouse, deleteHouseState, updateHouseState, getHouses } =
  housesSlice.actions;

export default housesSlice.reducer;
