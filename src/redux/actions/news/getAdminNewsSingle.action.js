import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetAdminNewsSingle = {
  getAdminNewsSingle: { data: null, loading: false, error: null },
};

export const getAdminNewsSingle = createAsyncThunk('news/getAdminNewsSingle', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/news/admin/single/${data?.newsId}`, {
      headers: { request_token: token },
    })
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      console.log(res);
      return rejectWithValue(res.response.data);
    });
});

export const reducerGetAdminNewsSingle = {
  [getAdminNewsSingle.pending]: (state) => {
    state.getAdminNewsSingle.loading = true;
  },
  [getAdminNewsSingle.fulfilled]: (state, action) => {
    state.getAdminNewsSingle.loading = false;
    state.getAdminNewsSingle.data = action.payload;

    state.getAdminNewsSingle.error = null;
  },
  [getAdminNewsSingle.rejected]: (state, action) => {
    state.getAdminNewsSingle.loading = false;
    state.getAdminNewsSingle.error = action.payload;
  },
};
