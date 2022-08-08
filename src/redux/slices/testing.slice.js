import { createSlice } from '@reduxjs/toolkit';
import { initStateCreateTesting, reducerCreateTesting } from '../actions/testing/createTesting.action';
import { initStateGetAdminTesting, reducerGetAdminTesting } from '../actions/testing/getAdminTesting.action';
import { initStateGetUserTesting, reducerGetUserTesting } from '../actions/testing/getUserTesting.action';

export const initialState = {
  ...initStateGetAdminTesting,
  ...initStateCreateTesting,
  ...initStateGetUserTesting,
};

export const testingSlice = createSlice({
  name: 'testing',
  initialState,
  reducers: {
    resetGetAdminTesting(state) {
      state.getAdminTesting = initStateGetAdminTesting.getAdminTesting;
    },
    resetCreateTesting(state) {
      state.createTesting = initStateCreateTesting.createTesting;
    },
  },
  extraReducers: {
    ...reducerGetAdminTesting,
    ...reducerCreateTesting,
    ...reducerGetUserTesting,
  },
});
export const { resetGetAdminTesting, resetCreateTesting } = testingSlice.actions;
export const testingReducer = testingSlice.reducer;
