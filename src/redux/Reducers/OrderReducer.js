import { GetMyOrders, getorderDetail } from "../../APIs/Oreders";
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

export const getorderdetail = createSlice({
  name: "order",
  initialState: {
    order: null,
    loadorder: false,
    errororder: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getorderDetail.pending, (state, action) => {
        state.loadorder = true;
      })
      .addCase(getorderDetail.fulfilled, (state, action) => {
        state.loadorder = false;
        state.order = action.payload;
      })
      .addCase(getorderDetail.rejected, (state, action) => {
        state.loadorder = false;
        state.errororder = action.error;
      });
  },
});

export const getSingleOrderReducer = getorderdetail.reducer;

export const getorderReducer = getorder.reducer;
