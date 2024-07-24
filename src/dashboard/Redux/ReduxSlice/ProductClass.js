import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  productclass: [],
  loading: false,
  errorMessage: null,
};

export const fetchProductclass = createAsyncThunk(
  "productclass/fetchProductclass",
  async () => {
    const Token = Cookies.get("token");

    const res = await axios(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/product-classes`
      // {
      //   headers: {
      //     Authorization: `Bearer ${Token}`,
      //   },
      // }
    );
    return res.data?.data?.productClasses;
  }
);

// create product class

export const createProductClass = createAsyncThunk(
  "productclass/createProductClass",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const Token = Cookies.get("token");

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/product-classes`,
        {
          name: data.data.name,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProductClass = createAsyncThunk(
  "productclass/updateProductClass",
  async (data, { rejectWithValue }) => {
    try {
      const Token = Cookies.get("token");

      const res = await axios.patch(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/product-classes/${data.id}`,
        {
          name: data?.Data?.name,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProductClass = createAsyncThunk(
  "productclass/deleteProductClass",
  async (data, { rejectWithValue }) => {
    try {
      const Token = Cookies.get("token");

      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/product-classes/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      return { res: res, id: data.id };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const productClassSlice = createSlice({
  name: "productclasses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductclass.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchProductclass.fulfilled, (state, action) => {
        state.loading = false;
        state.productclass = action.payload;
      })
      .addCase(fetchProductclass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProductClass.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductClass.fulfilled, (state, action) => {
        state.loading = false;
        state.productclass = [
          ...state.productclass,
          action.payload.data.data.productClass,
        ];
      })
      .addCase(createProductClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProductClass.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductClass.fulfilled, (state, action) => {
        const { id, name } = action.payload.data.data.productClass;

        const userIndex = current(state).productclass.findIndex(
          (user) => user.id === id
        );

        if (userIndex !== -1) {
          state.productclass[userIndex] = {
            ...state.productclass[userIndex],
            name: name,
          };
        }
      })
      .addCase(updateProductClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProductClass.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductClass.fulfilled, (state, action) => {
        const { id } = action.payload.id;
        state.productclass = state.productclass.filter(
          (user) => user.id !== action.payload.id
        );
      })
      .addCase(deleteProductClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const productClassReducers = productClassSlice.reducer;
