import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../APIs/Product";
const initialState = {
  product: [],
  status: "idle",
  err: null,
};
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
        state.product = state.product.concat(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.err = action.error.message;
      });
  },
});

export default getproductSlice.reducer;
