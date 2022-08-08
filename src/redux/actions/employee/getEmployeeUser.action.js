import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetEmployeeUser = {
  getEmployeeUser: { data: [], loading: false, error: null },
};

export const getEmployeeUser = createAsyncThunk('employee/getEmployeeUser', async (data, { rejectWithValue, fulfillWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/employee/user/get`, {
      headers: { request_token: token },
    })
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerGetEmployeeUser = {
  [getEmployeeUser.pending]: (state) => {
    state.getEmployeeUser.loading = true;
  },
  [getEmployeeUser.fulfilled]: (state, action) => {
    state.getEmployeeUser.loading = false;
    state.getEmployeeUser.data = action.payload;
    state.getEmployeeUser.error = null;
  },
  [getEmployeeUser.rejected]: (state, action) => {
    state.getEmployeeUser.loading = false;
    state.getEmployeeUser.error = action.payload;
  },
};
