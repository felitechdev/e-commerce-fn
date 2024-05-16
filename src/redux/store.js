import { configureStore } from "@reduxjs/toolkit";
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

import {
  createCatReducer,
  createSubCatReducer,
  deleteCatReducer,
  updateCatReducer,
} from "../dashboard/Redux/ReduxSlice/createCategory";
import { getMyprofilereducer } from "../dashboard/Redux/ReduxSlice/userProfile";
import { deleteProductReducer } from "../dashboard/Redux/ReduxSlice/createProduct";
import {
  getSingleOrderReducer,
  updateOrderReducer,
} from "../redux/Reducers/OrderReducer";
import usersSlice from "./Reducers/usersSlice";
import { productClassReducers } from "../dashboard/Redux/ReduxSlice/ProductClass";
import { productBrandReducers } from "../dashboard/Redux/ReduxSlice/ProductBrand.slice";

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
  singleorder: getSingleOrderReducer,

  productclass: productClassReducers,
  productbrand: productBrandReducers,

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
  updateoreder: updateOrderReducer,
  users: usersSlice,

  // orders: getorders,
};

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
