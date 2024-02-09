import { createSlice } from "@reduxjs/toolkit";
import { fetchCompany } from "../../Apis/Company";

const initialState = {
  company: [],
  loadcompany: false,
  errcompany: null,
};

export const getSlice = createSlice({
  name: "company",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state, action) => {
        state.loadcompany = true;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.loadcompany = false;
        state.company = state.company.concat(action.payload);
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.loadcompany = false;
        state.errcompany = action.error;
      });
  },
});

export default getSlice.reducer;
