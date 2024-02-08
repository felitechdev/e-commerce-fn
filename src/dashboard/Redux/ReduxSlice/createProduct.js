import { createSlice } from "@reduxjs/toolkit";
import { createProduct, deleteproduct } from "../../Apis/Product";

const initialState = {
  product: [],
  load: false,
  err: null,
};

export const creteproductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state, action) => {
        state.load = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.load = false;
        state.product = state.product.concat(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.load = false;
        state.err = action.error.message;
      });
  },
});

const deleteproductSlice = createSlice({
  name: "deleteproducts",
  initialState: {
    loading: false,
    error: null,
    deletedCategory: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteproduct.fulfilled, (state) => {
        state.loading = false;
        state.deletedCategory = null;
      })
      .addCase(deleteproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const deleteProductReducer = deleteproductSlice.reducer;

export default creteproductSlice.reducer;
