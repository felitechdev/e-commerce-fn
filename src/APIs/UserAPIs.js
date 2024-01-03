import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Token = sessionStorage.getItem("userToken");

// Async thunk for  get logged in user profile
export const GetMyprofile = createAsyncThunk(
  "user/getuser",
  async (token, { rejectWithValue }) => {
    console.log("sessionStorage.", Token);
    try {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`,
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/get-me`,
        config
      );
      if (response?.data && response.status == 200) {
        return response?.data;
      } else {
        // Handle unexpected
        return rejectWithValue({
          status: response.status,
          message: response?.data?.data,
        });
      }
    } catch (err) {
      console.log("error on getting myprofile ", err.response?.data);
      return rejectWithValue({
        status: err.response.status,
        message: err.response?.data?.message,
      });
    }
  }
);
