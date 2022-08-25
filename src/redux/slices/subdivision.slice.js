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
      state.getSubdivisionsWithPosts = initStateGetSubdivisionsWithPosts.getSubdivisionsWithPosts;
    },
    resetGetSubdivisions(state) {
      state.getSubdivisions = initStateGetSubdivisions.getSubdivisions;
    },
  },
  extraReducers: {
    ...reducerGetSubdivisions,
    ...reducerGetSubdivisionsWithPosts,
  },
});
export const { resetGetSubdivisionsWithPosts, resetGetSubdivisions } = subdivisionSlice.actions;
export const subdivisionReducer = subdivisionSlice.reducer;
