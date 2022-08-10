import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetUserTesting = {
  getUserTesting: { data: [], loading: false, error: null },
};

export const getUserTesting = createAsyncThunk('testing/getUserTesting', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/testing/${data?.id}`, {
      headers: {
        request_token: token,
      },
    })
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      console.log(res);
      return rejectWithValue(res.response.data);
    });
});

export const reducerGetUserTesting = {
  [getUserTesting.pending]: (state) => {
    state.getUserTesting.loading = true;
  },
  [getUserTesting.fulfilled]: (state, action) => {
    state.getUserTesting.loading = false;
    state.getUserTesting.data = action.payload;
    // if (current(state.getUserTesting.data)?.length !== 0) {
    //   state.getUserTesting.data = [...current(state.getUserTesting.data), ...action.payload];
    // } else {
    //   state.getUserTesting.data = action.payload;
    // }

    state.getUserTesting.error = null;
  },
  [getUserTesting.rejected]: (state, action) => {
    state.getUserTesting.loading = false;
    state.getUserTesting.error = action.payload;
  },
};
