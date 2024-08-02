import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const Token = Cookies.get("token");

// Async thunk for fetching products  to handle asynchronous
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products`
    );

    const sortedProducts = data?.data?.products.sort(
      (a, b) => b.createdAt - a.createdAt
    );

    return data?.data?.products;
  }
);

export const fetchProduct = async (productId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/${productId}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Token}`, // Pass the token only if it exists
        },
      }
    );

    return res.data;
  } catch (error) {
    if (error.response.data.status === "fail")
      return error.response.data.message;

    return "Something went wrong";
  }
};
