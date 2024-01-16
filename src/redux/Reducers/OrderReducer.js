import { GetMyOrders } from "../../APIs/Oreders";
import { createSlice } from "@reduxjs/toolkit";

export const getorder = createSlice({
  name: "orders",
  initialState: {
    orders: null,
    loadorders: false,
    errororders: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetMyOrders.pending, (state, action) => {
        state.loadorders = true;
      })
      .addCase(GetMyOrders.fulfilled, (state, action) => {
        state.loadorders = false;
        state.orders = action.payload;
      })
      .addCase(GetMyOrders.rejected, (state, action) => {
        state.loadorders = false;
        state.errororders = action.error;
      });
  },
});

export const getorderReducer = getorder.reducer;
