import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const Token = Cookies.get("token");

// Async thunk for fetching products  to handle asynchronous
export const fetchadminproduct = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products`
      // `https://feli-globalmakert-pr-147.onrender.com/api/v1/products`
    );

    const sortedProducts = data?.data?.products.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    console.log(sortedProducts);
    return sortedProducts;
  }
);

// create product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ productData, token }, { rejectWithValue }) => {
    console.log("productData", productData);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products`,
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`, // Pass the token only if it exists
          // "content-type": "multipart/form-data",
          "content-type": "application/json",
        },
        data: productData,
      });
      console.log("Product response ", response);

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
      console.log("error while creating product", err);
      return rejectWithValue({
        status: err.response?.data?.status,
        message: err.response?.data?.message,
      });
    }
  }
);

export const deleteproduct = createAsyncThunk(
  "product/delete",
  async ({ id, token }, { rejectWithValue }) => {
    alert("delete product");
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/${id}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`, // Pass the token only if it exists
        },
      });
      console.log("delete product", response);
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
      console.log("error while deleting product  api", err);
      return rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  }
);
