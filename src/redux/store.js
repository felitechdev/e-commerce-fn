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
import userReducer from "./userSlice"

const persistProductsConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistUserConfig = {
  key: "root",
  version: 1,
  storage,
}

const initialState = {
  userInfo: {},
  products: [],
};

const persistedProductsReducer = persistReducer(persistProductsConfig, productsReducer);
const persistedUserReducer = persistReducer(persistUserConfig, userReducer);

const rootReducer = {
  productsReducer: persistedProductsReducer,
  userReducer: persistedUserReducer,
}



export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
