import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Token = sessionStorage.getItem("userToken");

export const GetMyOrders = createAsyncThunk(
  "user/orders",
  async ({ page, pageSize, token , selectedStatus }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`,
        },
      };

        // Default URL
        let url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/orders?limit=${pageSize}&page=${page}`;

        // Append status if selectedStatus is not "All"
        if (selectedStatus && selectedStatus !== "All") {
          url += `&status=${selectedStatus}`;
        }
        // Make the API call
        const response = await axios.get(url, config);

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

export const UpdateOrder = createAsyncThunk(
  "order/update",
  async ({ token, id, status }, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/orders/${id}`,
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        data: { status },
      });

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
      return rejectWithValue({
        status: err.response.status,
        message: err.response?.data?.message,
      });
    }
  }
);
