import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import Cookies from "js-cookie";

const Token = Cookies.get("token");

// Async thunk for fetching comapanys  to handle asynchronous
export const fetchCompany = createAsyncThunk(
  "company/fetchcompany",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          authorization: token ? `Bearer ${token}` : `Bearer ${Token}`, // Pass the token only if it exists
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/sellers`,
        config
      );

      if (response?.data && response?.status == 201) {
        return response?.data;
      } else {
        // Handle unexpected
        return rejectWithValue({
          status: response?.status,
          message: response?.data,
        });
      }
    } catch (err) {
      console.log("error while getting company", err);
      return rejectWithValue({
        status: err.response?.data?.status,
        message: err.response?.data?.message,
      });
    }
  }
);
