import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetNewsFiltersUser = {
  getNewsFiltersUser: { data: [], loading: false, error: null },
};

export const getNewsFiltersUser = createAsyncThunk('newsFilter/getNewsFiltersUser', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/news-filter/user`, {
      headers: { request_token: token },
    })
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerGetNewsFiltersUser = {
  [getNewsFiltersUser.pending]: (state) => {
    state.getNewsFiltersUser.loading = true;
  },
  [getNewsFiltersUser.fulfilled]: (state, action) => {
    state.getNewsFiltersUser.loading = false;
    state.getNewsFiltersUser.data = action.payload;
    state.getNewsFiltersUser.error = null;
  },
  [getNewsFiltersUser.rejected]: (state, action) => {
    state.getNewsFiltersUser.loading = false;
    state.getNewsFiltersUser.error = action.payload;
  },
};
