import { createSlice, current } from "@reduxjs/toolkit";
import { fetchSubCategory, updatesubcategory } from "../../Apis/Categories";

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
        state.loadsubcategory = true;
      })
      .addCase(fetchSubCategory.fulfilled, (state, action) => {
        state.loadsubcategory = false;

        state.subcategories = action.payload.data.subCategories;
      })
      .addCase(fetchSubCategory.rejected, (state, action) => {
        state.loadsubcategory = false;
        state.errsubcategory = action.error;
      })
      .addCase(updatesubcategory.pending, (state, action) => {
        state.loadsubcategory = true;
      })
      .addCase(updatesubcategory.fulfilled, (state, action) => {
        state.loadsubcategory = false;
        // const { id, name } = action.payload.data.subCategories;

        // const userIndex = current(state).subcategories.findIndex(
        //   (user) => user.id === id
        // );

        // if (userIndex !== -1) {
        //   state.subcategories[userIndex] = {
        //     ...state.subcategories[userIndex],
        //     name: name,
        //   };
        // }
      })
      .addCase(updatesubcategory.rejected, (state, action) => {
        state.loadsubcategory = false;
        state.errsubcategory = action.error;
      });
  },
});

export default getsubCategory.reducer;
