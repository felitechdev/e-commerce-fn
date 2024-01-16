import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsReducer from "./productsSlice";
import userReducer from "./userSlice";

import {
  getProfileReducer,
  updateprofileReducer,
  ViewprofileReducer,
  updateprofileImageReducer,
} from "./Reducers/userReducers";
import cartRecuder from "./Reducers/cartRecuder";
import getproductSlice from "./Reducers/productReducers";
import { getorderReducer } from "./Reducers/OrderReducer";

// const persistProductsConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const persistUserConfig = {
//   key: "root",
//   version: 1,
//   storage,
// }

// storage.removeItem('persist:root')

const initialState = {
  userInfo: {
    profile: {},
    whishlist: [],
    cart: [],
  },
  products: [],
};

// const persistedProductsReducer = persistReducer(persistProductsConfig, productsReducer);
// const persistedUserReducer = persistReducer(persistUserConfig, userReducer);

const rootReducer = {
  productsReducer,
  userReducer,
  userprofile: getProfileReducer,
  profileupdate: updateprofileReducer,
  viewprofile: ViewprofileReducer,
  cart: cartRecuder,
  product: getproductSlice,
  profileimage: updateprofileImageReducer,
  orders: getorderReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});

// export let persistor = persistStore(store);
export default store;
