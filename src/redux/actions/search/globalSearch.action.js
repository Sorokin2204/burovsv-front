import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGlobalSearch = {
  globalSearch: { data: [], loading: false, error: null },
};

export const globalSearch = createAsyncThunk('newsType/globalSearch', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/search`, {
      params: {
        term: data?.term,
      },

      headers: { request_token: token },
    })
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerGlobalSearch = {
  [globalSearch.pending]: (state) => {
    state.globalSearch.loading = true;
  },
  [globalSearch.fulfilled]: (state, action) => {
    state.globalSearch.loading = false;
    state.globalSearch.data = action.payload;
    state.globalSearch.error = null;
  },
  [globalSearch.rejected]: (state, action) => {
    state.globalSearch.loading = false;
    state.globalSearch.error = action.payload;
  },
};
