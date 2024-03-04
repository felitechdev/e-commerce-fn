import { createProduct, deleteproduct } from "../../Apis/Product";
import { createSlice, current, createAction } from "@reduxjs/toolkit";

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
        state.dashproduct = action.payload;
      })
      .addCase(updateuserProduct, (state, action) => {
        const updatedProduct = action.payload;
        console.log("updatedProduct", updatedProduct);
        // state.dashproduct = state.dashproduct.map((product) => {
        //   if (product.id === updatedProduct.id) {
        //     // Merge the updated fields into the existing product
        //     return {
        //       ...product,
        //       ...updatedProduct.payload, // Assuming payload contains only the updated fields
        //     };
        //   }
        //   return product;
        // });
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
export const updateuserProduct = createAction("updateuserProduct");
export default creteproductSlice.reducer;
