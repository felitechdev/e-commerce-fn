import { createSlice } from "@reduxjs/toolkit";
import { GetMyprofile } from "../../Apis/User";

const initialState = {
  profile: null,
  loadprofile: false,
  errprofile: null,
};

export const getprofile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetMyprofile.pending, (state, action) => {
        state.loadprofile = true;
      })
      .addCase(GetMyprofile.fulfilled, (state, action) => {
        state.loadprofile = false;
        state.profile = action.payload;
      })
      .addCase(GetMyprofile.rejected, (state, action) => {
        state.loadprofile = false;
        state.errprofile = action.payload;
      });
  },
});

export const getMyprofilereducer = getprofile.reducer;
