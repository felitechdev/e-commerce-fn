import { createSlice } from "@reduxjs/toolkit";

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: wishlist,
  reducers: {
    addTowishlist: (state, action) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        // existingProduct.items += 0;
        state.push({ ...action.payload, items: 1 });
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
        localStorage.setItem("wishlist", JSON.stringify(state));
      } else {
        state.push({ ...action.payload.existingProduct });
      }
    },

    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

    removeTowishlist: (state, action) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct && existingProduct.items > 1) {
        existingProduct.items -= 1;
      } else {
        return state.filter((product) => product.id !== action.payload.id);
      }
    },
    clearwishlist: (state, action) => {
      return [];
    },
    clearitemwishlist: (state, action) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );
      return state.filter((product) => product.id !== existingProduct.id);
    },
  },
});

export const {
  addTowishlist,
  addQuantity,
  removeTowishlist,
  clearwishlist,
  clearitemwishlist,
  removeItem,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
