import { createSlice } from "@reduxjs/toolkit";

const checkForSimilarCartItem = (item, action) => { 
  return (item.productDBId === action.payload.productDBId &&
    item.colorId === action.payload.colorId &&
    item.size === action.payload.size &&
    item.deliveryFee === action.payload.deliveryFee);
}

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: []
  },
  reducers: {
    addToDefaultCart: (state, action) => {
        const item = state.products.find(
          (item) => { 
            return checkForSimilarCartItem(item, action);
          }
        );
        if (item) {
          item.quantity += action.payload.quantity;
        } else {
          state.products.push(action.payload);
        }
      
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => {
          return checkForSimilarCartItem(item, action)
        }
      );
      if (item) {
        item.quantity++;
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => {
          return checkForSimilarCartItem(item, action)
        }
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.productDBId !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToDefaultCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
} = productsSlice.actions;
export default productsSlice.reducer;
