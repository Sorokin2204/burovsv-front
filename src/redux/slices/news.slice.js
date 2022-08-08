import { createSlice } from '@reduxjs/toolkit';
import { initStateCreateNews, reducerCreateNews } from '../actions/news/createNews.action';
import { initStateGetAdminNews, reducerGetAdminNews } from '../actions/news/getAdminNews.action';
import { initStateGetUserNews, reducerGetUserNews } from '../actions/news/getUserNews.action';
import { initStateGetUserNewsSingle, reducerGetUserNewsSingle } from '../actions/news/getUserNewsSingle.action';

export const initialState = {
  ...initStateGetAdminNews,
  ...initStateCreateNews,
  ...initStateGetUserNews,
  ...initStateGetUserNewsSingle,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    resetGetAdminNews(state) {
      state.getAdminNews = initStateGetAdminNews.getAdminNews;
    },
    resetCreateNews(state) {
      state.createNews = initStateCreateNews.createNews;
    },
  },
  extraReducers: {
    ...reducerGetAdminNews,
    ...reducerCreateNews,
    ...reducerGetUserNews,
    ...reducerGetUserNewsSingle,
  },
});
export const { resetGetAdminNews, resetCreateNews } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
