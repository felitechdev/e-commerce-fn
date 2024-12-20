import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Token = sessionStorage.getItem("userToken");

export const Updateprofile = createAsyncThunk(
  "profile/updateprofile",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/profiles`,
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`,
          "content-type": "multipart/form-data",
        },
        data: data,
      });

      if (response?.data && response.status === 200) {
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

export const Updateprofilenames = createAsyncThunk(
  "profile/updateinfo",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/profile-data`,
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`,
          "content-type": "application/json",
        },
        data: data,
      });

      if (response?.data && response.status === 201) {
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

export const UpdateprofileInage = createAsyncThunk(
  "profile/updateprofile",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/update-photo`,
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`,
          // "content-type": "application/json",
          "content-type": "multipart/form-data",
        },
        data: data,
      });

      if (response?.data && response.status === 200) {
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

// /api/v1/users/<user-id>/user-profiles

export const getprofileAddress = createAsyncThunk(
  "profile/getprofileAddress",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/users/${id}/user-profiles`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`,
          },
        }
      );

      if (response?.data && response.status === 200) {
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

export const updateprofileAddress = createAsyncThunk(
  "profile/updateprofileAddress",
  async ({ data, token, id }, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/users/${id}/user-profiles`,
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`,
          "content-type": "application/json",
        },
        data: data,
      });

      if (response?.data) {
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

//- Async thunk for  get logged in user profile  info
export const GetMyprofile = createAsyncThunk(
  "user/getuser",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`,
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/get-me`,
        config
      );
      if (response?.data && response.status === 200) {
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

// - get seller's profile
export const GetMyprofilebyId = createAsyncThunk(
  "user/getuserprofile",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer ${Token}`,
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/profiles`,
        config
      );

      if (response?.data && response.status === 200) {
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

export const checkAuthentication = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/auth/get-me`,
      config
    );

    if (response?.data && response.status === 200) {
      return response?.data;
    }
  } catch (err) {
    throw err;
  }
};
