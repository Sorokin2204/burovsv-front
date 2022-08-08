import { createSlice } from '@reduxjs/toolkit';
import { initStateGetSubdivisions, reducerGetSubdivisions } from '../actions/subdivision/getSubdivisions.action';
import { initStateGetSubdivisionsWithPosts, reducerGetSubdivisionsWithPosts } from '../actions/subdivision/getSubdivisionWithPosts.action';

export const initialState = {
  ...initStateGetSubdivisions,
  ...initStateGetSubdivisionsWithPosts,
};

export const subdivisionSlice = createSlice({
  name: 'subdivision',
  initialState,
  reducers: {
    resetGetSubdivisionsWithPosts(state) {
      state.getSubdivisionsWithPosts = initStateGetSubdivisions.getSubdivisionsWithPosts;
    },
  },
  extraReducers: {
    ...reducerGetSubdivisions,
    ...reducerGetSubdivisionsWithPosts,
  },
});
export const { resetGetSubdivisionsWithPosts } = subdivisionSlice.actions;
export const subdivisionReducer = subdivisionSlice.reducer;
