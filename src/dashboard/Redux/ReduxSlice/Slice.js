import { createSlice, current, createAction } from "@reduxjs/toolkit";
import { fetchadminproduct } from "../../Apis/Product";

// set initial state
const initialState = {
  dashproduct: [],
  loading: false,
  err: null,
};

// create slice hold reducer logic and actions
export const getdashproductslice = createSlice({
  name: "dashproduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchadminproduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchadminproduct.fulfilled, (state, action) => {
        state.loading = false;
        // Add any fetched products to the array
        state.product = state.dashproduct.concat(action.payload);
      })
      .addCase(fetchadminproduct.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
      })
      .addCase(updateuserProduct, (state, action) => {
        console.log("action.payload", action.payload);
        state.dashproduct = current(state).dashproduct.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
      });
  },
});

export const updateuserProduct = createAction("updateuserProduct");
export default getdashproductslice.reducer;
