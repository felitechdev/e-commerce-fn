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
        // Add any fetched products to the array
        state.dashproduct = action.payload;
      })
      .addCase(fetchadminproduct.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
      })
      .addCase(updateuserProduct, (state, action) => {
        const updatedProduct = action.payload;

        state.dashproduct = state.dashproduct.map((product) => {
          if (product.id === updatedProduct.id) {
            // Merge the updated fields into the existing product
            return {
              ...product,
              ...updatedProduct.payload, // Assuming payload contains only the updated fields
            };
          }
          return product;
        });
      });
  },
});

export const updateuserProduct = createAction("updateuserProduct");
export default getdashproductslice.reducer;
