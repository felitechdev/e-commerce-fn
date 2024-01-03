import { createSlice } from "@reduxjs/toolkit";
import { GetMyprofile } from "../../APIs/UserAPIs";

const initialState = {
  profile: null,
  loadprofile: false,
  errprofile: null,
};

const getprofile = createSlice({
  name: "profile",
  initialState,
  reducers: {},
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
        state.errprofile = action.error;
      });
  },
});

export const getProfileReducer = getprofile.reducer;
