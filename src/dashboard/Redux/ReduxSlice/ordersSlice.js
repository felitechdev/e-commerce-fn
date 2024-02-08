import { createSlice } from "@reduxjs/toolkit";
import { fetchorders } from "../../Apis/orders";

const initialState = {
  orders: [],
  loadorders: false,
  errorders: null,
};

const getorders = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchorders.pending, (state, action) => {
        state.loadorders = true;
      })
      .addCase(fetchorders.fulfilled, (state, action) => {
        state.loadorders = false;
        state.categories = state.orders.concat(action.payload);
      })
      .addCase(fetchorders.rejected, (state, action) => {
        state.loadorders = false;
        state.errorders = action.error;
      });
  },
});

export default getorders.reducer;
