import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../../APIs/Product';
const initialState = {
  products: [],
  status: 'idle',
  err: null,
  loading: false,
};
export const getproductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.err = action.error.message;
      });
  },
});

export default getproductSlice.reducer;
