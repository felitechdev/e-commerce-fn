import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  productbrand: [],
  loading: false,
  errorMessage: null,
};

export const fetchProductBrand = createAsyncThunk(
  "productbrand/fetchProductBrand",
  async () => {
    const Token = Cookies.get("token");
    const res = await axios(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/brands`
      //   {
      //     headers: {
      //       Authorization: `Bearer ${Token}`,
      //     },
      //   }
    );
    return res.data?.data?.brands;
  }
);

// create product class

export const createProductBrand = createAsyncThunk(
  "productcbrand/createProductBrand",
  async (data, { rejectWithValue }) => {
    console.log("data", data.data.productclass);
    try {
      const Token = Cookies.get("token");

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/brands`,
        {
          name: data.data.name,
          productClass: data.data.productclass,
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
export const productBrandSlice = createSlice({
  name: "productbrand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductBrand.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchProductBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.productbrand = action.payload;
      })
      .addCase(fetchProductBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProductBrand.pending, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createProductBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.productbrand = [
          ...state.productbrand,
          action.payload.data.data.brand,
        ];
      })
      .addCase(createProductBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export const updateuserRole = createAction("updateuserRole");

export const productBrandReducers = productBrandSlice.reducer;
