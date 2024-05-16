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
        state.loading = false;
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
      });

    // .addCase(updateuserRole, (state, action) => {
    //   const { userid, role } = action.payload;

    //   const userIndex = current(state).productclass.findIndex(
    //     (user) => user.id === userid
    //   );

    //   if (userIndex !== -1) {
    //     state.productclass[userIndex] = {
    //       ...state.productclass[userIndex],
    //       role: role,
    //     };
    //   }
    // });
  },
});

// export const updateuserRole = createAction("updateuserRole");

export const productClassReducers = productClassSlice.reducer;
