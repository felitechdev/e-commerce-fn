import { configureStore } from "@reduxjs/toolkit";
import getproductSlice from "./ReduxSlice/Slice";
import creteproductSlice from "./ReduxSlice/createProduct";
import userLoginSlice from "./ReduxSlice/LoginSlice";
import getSlice from "./ReduxSlice/getCompany";
import getsubcategory from "./ReduxSlice/subcategorySlice";
import getCategory from "./ReduxSlice/categorySlice";
import getorders from "./ReduxSlice/ordersSlice";
import {
  createCatReducer,
  createSubCatReducer,
  deleteCatReducer,
  updateCatReducer,
} from "./ReduxSlice/createCategory";
import { getMyprofilereducer } from "./ReduxSlice/userProfile";
import { deleteProductReducer } from "./ReduxSlice/createProduct";

export const store = configureStore({
  reducer: {
    adminProduct: getproductSlice,
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
    orders: getorders,
  },
});
