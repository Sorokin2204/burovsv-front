import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetAdminTesting = {
  getAdminTesting: { data: [], loading: false, error: null },
};

export const getAdminTesting = createAsyncThunk('testing/getAdminTesting', async ({ page = 1, search = '' }, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .get(
      `${process.env.REACT_APP_SERVER_API}/testing/list`,

      {
        params: { page, search, request_token: token },
      },
    )
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      console.log(res);
      return rejectWithValue(res.response.data);
    });
});

export const reducerGetAdminTesting = {
  [getAdminTesting.pending]: (state) => {
    state.getAdminTesting.loading = true;
  },
  [getAdminTesting.fulfilled]: (state, action) => {
    state.getAdminTesting.loading = false;
    state.getAdminTesting.data = action.payload;
    // if (current(state.getAdminTesting.data)?.length !== 0) {
    //   state.getAdminTesting.data = [...current(state.getAdminTesting.data), ...action.payload];
    // } else {
    //   state.getAdminTesting.data = action.payload;
    // }

    state.getAdminTesting.error = null;
  },
  [getAdminTesting.rejected]: (state, action) => {
    state.getAdminTesting.loading = false;
    state.getAdminTesting.error = action.payload;
  },
};
