import { GetMyOrders, getorderDetail } from "../../APIs/Oreders";
import { createSlice, current } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { UpdateOrder } from "../../APIs/Oreders";

export const getorder = createSlice({
  name: "orders",
  initialState: {
    orders: [],
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
        state.orders = action.payload.data.orders;
      })
      .addCase(GetMyOrders.rejected, (state, action) => {
        state.loadorders = false;
        state.errororders = action.error;
      })
      .addCase(updateOrderStatus, (state, action) => {
        const { orderId, status } = action.payload;
        console.log("action", "state", current(state).orders);
        const orderIndex = current(state).orders.findIndex(
          (order) => order.id === orderId
        );
        console.log(
          "orderIndex",
          orderIndex,
          "status",
          status,
          "orderId",
          orderId
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = {
            ...state.orders[orderIndex],
            status,
          };
        }
      });
    // .addCase(updateOrderStatus, (state, action) => {
    //   console.log("action", "state", current(state).orders);
    //   const { orderId, status } = action.payload;
    //   const updatedOrder = current(state).orders.find(
    //     (order) => order.id === orderId
    //   );
    //   console.log(
    //     "updatedOrder",
    //     updatedOrder,
    //     "status",
    //     status,
    //     "orderId",
    //     orderId
    //   );
    //   if (updatedOrder) {
    //     console.log("updatedOrder", updatedOrder.status);
    //     updatedOrder.status = status;
    //   }
    // });
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

export const updateOrder = createSlice({
  name: "update",
  initialState: {
    order: [],
    loadorder: false,
    errororder: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UpdateOrder.pending, (state, action) => {
        state.loadorder = true;
      })
      .addCase(UpdateOrder.fulfilled, (state, action) => {
        state.loadorder = false;

        state.order = action.payload;
      })
      .addCase(UpdateOrder.rejected, (state, action) => {
        state.loadorder = false;
        state.errororder = action.error;
      });
  },
});
export const updateOrderStatus = createAction("updateOrderStatus");
export const getSingleOrderReducer = getorderdetail.reducer;

export const updateOrderReducer = updateOrder.reducer;

export const getorderReducer = getorder.reducer;
// .updateoreder
