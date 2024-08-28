import { createSlice } from "@reduxjs/toolkit";
import { getprofileAddress, updateprofileAddress } from "../../APIs/UserAPIs";

const initialState = {
  address: null,
  loadaddress: false,
  erraddress: null,
  loadaddressupdate: false,
};

const address = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getprofileAddress.pending, (state, action) => {
        state.loadaddress = true;
      })
      .addCase(getprofileAddress.fulfilled, (state, action) => {
        state.loadaddress = false;

        state.address = action.payload;
      })
      .addCase(getprofileAddress.rejected, (state, action) => {
        state.loadaddress = false;
        state.erraddress = action.error;
      })
      .addCase(updateprofileAddress.pending, (state, action) => {
        state.loadaddressupdate = true;
      })
      .addCase(updateprofileAddress.fulfilled, (state, action) => {
        state.loadaddressupdate = false;
        state.address = action.payload;
      })
      .addCase(updateprofileAddress.rejected, (state, action) => {
        state.loadaddressupdate = false;
        state.erraddress = action.error;
      });
  },
});

export const profileAddressReducer = address.reducer;
