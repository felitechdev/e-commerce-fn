import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
  users: [],
  loading: false,
  errorMessage: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const Token = Cookies.get('token');

  const res = await axios(
    `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/users`,
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );

  return res.data.data.users;
});

export const usersSlice = createSlice({
  name: 'users',
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
      });
  },
});

export default usersSlice.reducer;
