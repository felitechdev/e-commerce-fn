import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import Cookies from "js-cookie";

const Token = Cookies.get("token");

// Async thunk for fetching categories  to handle asynchronous
export const fetchCategory = createAsyncThunk(
  "category/fetchcategory",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`, // Pass the token only if it exists
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/categories`,
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
      return rejectWithValue({
        status: err.response.status,
        message: err.response?.data?.message,
      });
    }
  }
);

export const fetchSubCategory = createAsyncThunk(
  "subcategry/fetchsubcategory",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`, // Pass the token only if it exists
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/subcategories`,
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
      return rejectWithValue({
        status: err.response.status,
        message: err.response?.data?.message,
      });
    }
  }
);

// create category
export const createcategory = createAsyncThunk(
  "category/createCategory",
  async ({ Data, token }, { rejectWithValue }) => {
    console.log("data", Data);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/categories`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`, // Pass the token only if it exists
        },
        data: Data,
      });

      // return response;
      if (response.status == 201) {
        return response;
      } else {
        // Handle unexpected status codes
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
      }
    } catch (err) {
      return rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  }
);
// update category
export const updatecategory = createAsyncThunk(
  "category/updateCategory",
  async ({ Data, id, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/categories/${id}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`,
        },
        data: Data,
      });

      // return response;
      if (response.status == 200) {
        return response;
      } else {
        // Handle unexpected status codes
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
      }
    } catch (err) {
      return rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  }
);

export const createsubcategory = createAsyncThunk(
  "subcategory/createsubcategory",
  async ({ Data, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/subcategories`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`, // Pass the token only if it exists
        },
        data: Data,
      });

      if (response.status == 201) {
        return response;
      } else {
        // Handle unexpected status codes
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
      }
    } catch (err) {
      return rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  }
);

export const deletecategory = createAsyncThunk(
  "category/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/categories/${id}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`, // Pass the token only if it exists
        },
      });

      // return response;
      if (response.status == 204) {
        return response;
      } else {
        // Handle unexpected status codes
        return rejectWithValue({
          status: response.status,
          message: response.data.message,
        });
      }
    } catch (err) {
      return rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  }
);
