import { createSlice } from "@reduxjs/toolkit";

import { Login } from "../../Apis/User";

const initialState = {
  user: "",
  err: "",
  load: false,
};

export const userLoginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state, action) => {
        state.load = true;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.load = false;
        state.user = action.payload;
      })
      .addCase(Login.rejected, (state, action) => {
        state.load = false;
        state.err = action.error;
      });
  },
});

export default userLoginSlice.reducer;
