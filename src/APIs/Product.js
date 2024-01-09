import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const Token = Cookies.get("token");

// Async thunk for fetching products  to handle asynchronous
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/products`
    );
    console.log("product on fetch", data.status, data?.data?.products);
    const sortedProducts = data?.data?.products.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    console.log(sortedProducts);
    return sortedProducts;
  }
);
