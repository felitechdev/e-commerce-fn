import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../Apis/Product";

// set initial state
const initialState = {
  product: [],
  status: "idle",
  err: null,
};

// create slice hold reducer logic and actions
export const getproductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        // Add any fetched products to the array
        state.product = state.product.concat(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.err = action.error.message;
      });
  },
});

export default getproductSlice.reducer;
