import { createSlice, current, createAction } from "@reduxjs/toolkit";
import { fetchadminproduct } from "../../Apis/Product";

// set initial state
const initialState = {};

// create slice hold reducer logic and actions
export const getdashproductslice = createSlice({
  name: "dashproduc",
  initialState: {
    dashproduct: [],
    loading: false,
    err: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchadminproduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchadminproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.dashproduct = action.payload;
        // Add any fetched products to the array
      })
      .addCase(fetchadminproduct.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
      })
      .addCase(updateuserProduct, (state, action) => {
        const updatedProduct = action.payload;

        const currentDashProduct = current(state).dashproduct;
        console.log(
          "updatedProduct on get",

          currentDashProduct,
          updatedProduct.product
        );
        const updatedDashProduct = [
          updatedProduct.product,
          ...currentDashProduct,
        ];
        console.log(
          "updated",
          current(state).dashproduct.concat(updatedProduct.product)
        );

        state.dashproduct = updatedDashProduct;
      });
  },
});

export const updateuserProduct = createAction("updateuserProduct");
export default getdashproductslice.reducer;
