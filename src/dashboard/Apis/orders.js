import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Cookies from 'js-cookie';

const Token = Cookies.get('token');

export const fetchorders = createAsyncThunk(
  'orders/fetchorders',
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: token
            ? `Bearer ${token}`
            : `Bearer ${Token}`, // Pass the token only if it exists
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/orders`,
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
