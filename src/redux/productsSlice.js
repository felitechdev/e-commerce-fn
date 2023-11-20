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
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
} = productsSlice.actions;
export default productsSlice.reducer;
