import { createSlice, current } from '@reduxjs/toolkit';

let cart = JSON.parse(localStorage.getItem('cart')) || [];
export const cartSlice = createSlice({
  name: 'cart',
  initialState: cart,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.items += 1;
      } else {
        state.push({ ...action.payload, items: 1 });
      }
    },

    addQuantity: (state, action) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.items = action.payload.qnty;
        localStorage.setItem('cart', JSON.stringify(state));
      } else {
        state.push({ ...action.payload.existingProduct });
      }
    },

    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

    removeToCart: (state, action) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct && existingProduct.items > 1) {
        existingProduct.items -= 1;
      } else {
        return state.filter(
          (product) => product.id !== action.payload.id
        );
      }
    },
    clearCart: (state, action) => {
      return [];
    },
    clearitemCart: (state, action) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );
      return state.filter(
        (product) => product.id !== existingProduct.id
      );
    },
  },
});

export const {
  addToCart,
  addQuantity,
  removeToCart,
  clearCart,
  clearitemCart,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
