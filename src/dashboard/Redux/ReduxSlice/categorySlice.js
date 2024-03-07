import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "../../Apis/Categories";

const initialState = {
  categories: [],
  loadcategory: false,
  errcategory: null,
};

const getCategory = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.loadcategory = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loadcategory = false;
        state.categories = action.payload.data.categories;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loadcategory = false;
        state.errcategory = action.error;
      });
  },
});

export default getCategory.reducer;
