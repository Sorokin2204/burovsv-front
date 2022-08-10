import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetUserNews = {
  getUserNews: { data: [], loading: false, error: null },
};

export const getUserNews = createAsyncThunk('news/getUserNews', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/news/user/${data?.newsFilterId}`, {
      headers: { request_token: token },
      params: { newsTypeId: data?.newsTypeId },
    })
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      console.log(res);
      return rejectWithValue(res.response.data);
    });
});

export const reducerGetUserNews = {
  [getUserNews.pending]: (state) => {
    state.getUserNews.loading = true;
  },
  [getUserNews.fulfilled]: (state, action) => {
    state.getUserNews.loading = false;
    state.getUserNews.data = action.payload;

    state.getUserNews.error = null;
  },
  [getUserNews.rejected]: (state, action) => {
    state.getUserNews.loading = false;
    state.getUserNews.error = action.payload;
  },
};
