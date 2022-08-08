import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetAdminNews = {
  getAdminNews: { data: [], loading: false, error: null },
};

export const getAdminNews = createAsyncThunk('news/getAdminNews', async ({ page = 1, search = '' }, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .get(
      `${process.env.REACT_APP_SERVER_API}/news/list`,

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

export const reducerGetAdminNews = {
  [getAdminNews.pending]: (state) => {
    state.getAdminNews.loading = true;
  },
  [getAdminNews.fulfilled]: (state, action) => {
    state.getAdminNews.loading = false;
    state.getAdminNews.data = action.payload;
    // if (current(state.getAdminNews.data)?.length !== 0) {
    //   state.getAdminNews.data = [...current(state.getAdminNews.data), ...action.payload];
    // } else {
    //   state.getAdminNews.data = action.payload;
    // }

    state.getAdminNews.error = null;
  },
  [getAdminNews.rejected]: (state, action) => {
    state.getAdminNews.loading = false;
    state.getAdminNews.error = action.payload;
  },
};
