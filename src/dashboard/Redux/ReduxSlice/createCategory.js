import { createSlice } from "@reduxjs/toolkit";
import {
  createcategory,
  createsubcategory,
  deletecategory,
  updatecategory,
} from "../../Apis/Categories";

const initialState = {
  category: [],
  load: false,
  err: null,
  subcategory: [],
  loadsub: false,
  errsub: null,
};

export const createCategory = createSlice({
  name: "category",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(createcategory.pending, (state, action) => {
        state.load = true;
      })
      .addCase(createcategory.fulfilled, (state, action) => {
        state.load = false;
        state.category = state.category.concat(action.payload);
      })
      .addCase(createcategory.rejected, (state, action) => {
        state.load = false;
        state.err = action.error.message;
      });
  },
});

export const createSubCategory = createSlice({
  name: "subcategory",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(createsubcategory.pending, (state, action) => {
        state.loadsub = true;
      })
      .addCase(createsubcategory.fulfilled, (state, action) => {
        state.loadsub = false;
        state.subcategory = state.subcategory.concat(action.payload);
      })
      .addCase(createsubcategory.rejected, (state, action) => {
        state.loadsub = false;
        state.errsub = action.error.message;
      });
  },
});

const deleteCategory = createSlice({
  name: "deleteCategory",
  initialState: {
    loading: false,
    error: null,
    deletedCategory: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletecategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletecategory.fulfilled, (state) => {
        state.loading = false;
        state.deletedCategory = null;
      })
      .addCase(deletecategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const updateCategory = createSlice({
  name: "deleteCategory",
  initialState: {
    updateloading: false,
    updaterror: null,
    updateCategory: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatecategory.pending, (state) => {
        state.updateloading = true;
        state.updaterror = null;
      })
      .addCase(updatecategory.fulfilled, (state) => {
        state.updateloading = false;
        state.updateCategory = null;
      })
      .addCase(updatecategory.rejected, (state, action) => {
        state.updateloading = false;
        state.updaterror = action.payload;
      });
  },
});

export const updateCatReducer = updateCategory.reducer;
export const deleteCatReducer = deleteCategory.reducer;
export const createCatReducer = createCategory.reducer;
export const createSubCatReducer = createSubCategory.reducer;
