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

export const updateProductBrand = createAsyncThunk(
  "productcbrand/updateProductBrand",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const Token = Cookies.get("token");

      const res = await axios.patch(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/brands/${id}`,

        { data: data },
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

export const deleteProductBrand = createAsyncThunk(
  "productcbrand/deleteProductBrand",
  async (data, { rejectWithValue }) => {
    try {
      const Token = Cookies.get("token");

      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/brands/${data.id}`,
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
      })
      .addCase(updateProductBrand.pending, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProductBrand.fulfilled, (state, action) => {
        const { id, name } = action.payload.data.data.brand;

        const brandIndex = current(state).productbrand.findIndex(
          (brand) => brand.id === id
        );

        if (brandIndex !== -1) {
          state.productbrand[brandIndex] = {
            ...state.productbrand[brandIndex],
            name: name,
          };
        }
      })
      .addCase(updateProductBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProductBrand.pending, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProductBrand.fulfilled, (state, action) => {
        const { id } = action.payload.id;
        state.productbrand = state.productbrand.filter(
          (brand) => brand.id !== action.payload.id
        );
      })
      .addCase(deleteProductBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export const updateuserRole = createAction("updateuserRole");

export const productBrandReducers = productBrandSlice.reducer;
