import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Token = sessionStorage.getItem("userToken");

export const GetMyOrders = createAsyncThunk(
  "user/orders",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`,
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/orders`,
        config
      );
      console.log("orders response", response);
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
      console.log("error on getting orders ", err.response?.data);
      return rejectWithValue({
        status: err.response.status,
        message: err.response?.data?.message,
      });
    }
  }
);

export const getorderDetail = createAsyncThunk(
  "order/detail",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`,
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/orders/${id}`,
        config
      );
      console.log("orders detail ", response);
      if (response?.data && response?.status == 200) {
        return response?.data?.data;
      } else {
        // Handle unexpected
        return rejectWithValue({
          status: response.status,
          message: response?.data?.data,
        });
      }
    } catch (err) {
      return rejectWithValue({
        status: err.response.status,
        message: err.response?.data?.message,
      });
    }
  }
);
