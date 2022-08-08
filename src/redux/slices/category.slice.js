import { createSlice } from '@reduxjs/toolkit';
import { initStateCreateCategory, reducerCreateCategory } from '../actions/category/createCategory';
import { initStategetCatsByPostAndSubdiv, reducergetCatsByPostAndSubdiv } from '../actions/category/getCatsByPostAndSubdiv';

export const initialState = {
  ...initStategetCatsByPostAndSubdiv,
  ...initStateCreateCategory,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetGetCatsByPostAndSubdiv(state) {
      state.getCatsByPostAndSubdiv = initStategetCatsByPostAndSubdiv.getCatsByPostAndSubdiv;
    },
  },
  extraReducers: {
    ...reducergetCatsByPostAndSubdiv,
    ...reducerCreateCategory,
  },
});
export const { resetGetCatsByPostAndSubdiv } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
