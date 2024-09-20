import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  users: [],
  loading: false,
  errorMessage: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, pageSize }, { rejectWithValue }) => {
    const Token = Cookies.get("token");

    const res = await axios(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/users?limit=${pageSize}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    return res.data.data.users;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Or customize error handling
      })
      .addCase(updateuserRole, (state, action) => {
        const { userid, role } = action.payload;

        const userIndex = current(state).users.findIndex(
          (user) => user.id === userid
        );

        if (userIndex !== -1) {
          state.users[userIndex] = {
            ...state.users[userIndex],
            role: role,
          };
        }
      });
  },
});

export const updateuserRole = createAction("updateuserRole");

export default usersSlice.reducer;
