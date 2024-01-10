import { createSlice } from "@reduxjs/toolkit";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
export const cartSlice = createSlice({
  name: "cart",
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
    removeToCart: (state, action) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct && existingProduct.items > 1) {
        existingProduct.items -= 1;
      } else {
        return state.filter((product) => product.id !== action.payload.id);
      }
    },
  },
});

export const { addToCart, removeToCart } = cartSlice.actions;

export default cartSlice.reducer;
