import { createSlice } from "@reduxjs/toolkit";
import { GetMyprofile } from "../../APIs/UserAPIs";
import { Updateprofile } from "../../APIs/UserAPIs";
import { GetMyprofilebyId } from "../../APIs/UserAPIs";

const initialState = {
  profile: null,
  loadprofile: false,
  errprofile: null,
};

const viewprofile = createSlice({
  name: "viewprofile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetMyprofilebyId.pending, (state, action) => {
        state.loadprofile = true;
      })
      .addCase(GetMyprofilebyId.fulfilled, (state, action) => {
        state.loadviewprofile = false;
        state.viewprofile = action.payload;
      })
      .addCase(GetMyprofilebyId.rejected, (state, action) => {
        state.loadviewprofile = false;
        state.errviewprofile = action.error;
      });
  },
});

const getprofile = createSlice({
  name: "profile",
  initialState: {
    viewprofile: null,
    loadviewprofile: false,
    errviewprofile: null,
  },
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

const updateprofile = createSlice({
  name: "updateprofile",
  initialState: {
    profileupdate: null,
    loadprofileupdate: false,
    errprofileupdate: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Updateprofile.pending, (state, action) => {
        state.loadprofileupdate = true;
      })
      .addCase(Updateprofile.fulfilled, (state, action) => {
        state.loadprofileupdate = false;
        state.profileupdate = action.payload;
      })
      .addCase(Updateprofile.rejected, (state, action) => {
        state.loadprofileupdate = false;
        state.errprofileupdate = action.error;
      });
  },
});

export const ViewprofileReducer = viewprofile.reducer;
export const updateprofileReducer = updateprofile.reducer;
export const getProfileReducer = getprofile.reducer;
