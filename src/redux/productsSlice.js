import { createSlice } from "@reduxjs/toolkit";

const checkForSimilarCartItem = (item, payload) => { 
  return (item.productId === payload.productId &&
    item.colorId === payload.colorId &&
    item.size === payload.size &&
    item.deliveryFee === payload.deliveryFee);
}

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: []
  },
  reducers: {
    addToDefaultCart: (state, action) => {
        const item = state.products.find(
          (itemInfo) => {
            return checkForSimilarCartItem(itemInfo, action.payload);
          }
      );
      if (item) {
        item.quantity += action.payload.quantity;
        item.productTotalCost = (item.quantity * action.payload.price) + action.payload.deliveryFee
      } else {
        state.products.push(action.payload);
      }
      
    },
    increaseItemQuantity: (state, action) => {
      const item = state.products.find(
        (item) => {
          return item._id === action.payload
        }
      );
      if (item) {
        item.quantity++;
        item.productTotalCost = (item.quantity * item.price) + item.deliveryFee
      }
    },
    drecreaseItemQuantity: (state, action) => {
      const item = state.products.find(
        (item) => {
          return item._id === action.payload
        }
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
        item.productTotalCost = (item.quantity * item.price) + item.deliveryFee
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToDefaultCart,
  increaseItemQuantity,
  drecreaseItemQuantity,
  deleteItem,
  resetCart,
} = productsSlice.actions;
export default productsSlice.reducer;
