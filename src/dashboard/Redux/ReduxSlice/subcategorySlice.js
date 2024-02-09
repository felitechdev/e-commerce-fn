import { createSlice } from "@reduxjs/toolkit";
import { fetchSubCategory } from "../../Apis/Categories";

const initialState = {
  subcategories: [],
  loadsubcategory: false,
  errsubcategory: null,
};

const getsubCategory = createSlice({
  name: "subcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategory.pending, (state, action) => {
        console.log("pending");
        state.loadsubcategory = true;
      })
      .addCase(fetchSubCategory.fulfilled, (state, action) => {
        state.loadsubcategory = false;
        state.subcategories = state.subcategories.concat(action.payload);
      })
      .addCase(fetchSubCategory.rejected, (state, action) => {
        state.loadsubcategory = false;
        state.errsubcategory = action.error;
      });
  },
});

export default getsubCategory.reducer;
