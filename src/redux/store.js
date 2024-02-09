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
  updateprofilenamesReducer,
} from "./Reducers/userReducers";
import cartRecuder from "./Reducers/cartRecuder";
import getproductSlice from "./Reducers/productReducers";
import { getorderReducer } from "./Reducers/OrderReducer";

import getdashproductslice from "../dashboard/Redux/ReduxSlice/Slice";
import creteproductSlice from "../dashboard/Redux/ReduxSlice/createProduct";
import userLoginSlice from "../dashboard/Redux/ReduxSlice/LoginSlice";
import getSlice from "../dashboard/Redux/ReduxSlice/getCompany";
import getsubcategory from "../dashboard/Redux/ReduxSlice/subcategorySlice";
import getCategory from "../dashboard/Redux/ReduxSlice/categorySlice";
import getorders from "../dashboard/Redux/ReduxSlice/ordersSlice";
import {
  createCatReducer,
  createSubCatReducer,
  deleteCatReducer,
  updateCatReducer,
} from "../dashboard/Redux/ReduxSlice/createCategory";
import { getMyprofilereducer } from "../dashboard/Redux/ReduxSlice/userProfile";
import { deleteProductReducer } from "../dashboard/Redux/ReduxSlice/createProduct";

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
  usernameupdate: updateprofilenamesReducer,

  adminProduct: getdashproductslice,
  createproduct: creteproductSlice,
  userlogin: userLoginSlice,
  getcompany: getSlice,
  category: getCategory,
  subcategory: getsubcategory,
  createcategory: createCatReducer,
  createsubcategory: createSubCatReducer,
  deletecat: deleteCatReducer,
  updatecat: updateCatReducer,
  userprofile: getMyprofilereducer,
  deleteproduct: deleteProductReducer,
  // orders: getorders,
};

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
