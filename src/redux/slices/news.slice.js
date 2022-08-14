import { createSlice } from '@reduxjs/toolkit';
import { initStateCreateNews, reducerCreateNews } from '../actions/news/createNews.action';
import { initStateDeleteNews, reducerDeleteNews } from '../actions/news/deleteNews.action';
import { initStateGetAdminNews, reducerGetAdminNews } from '../actions/news/getAdminNews.action';
import { initStateGetAdminNewsSingle, reducerGetAdminNewsSingle } from '../actions/news/getAdminNewsSingle.action';
import { initStateGetUserNews, reducerGetUserNews } from '../actions/news/getUserNews.action';
import { initStateGetUserNewsSingle, reducerGetUserNewsSingle } from '../actions/news/getUserNewsSingle.action';
import { initStateUpdateNews, reducerUpdateNews } from '../actions/news/updateNews.action';

export const initialState = {
  ...initStateGetAdminNews,
  ...initStateCreateNews,
  ...initStateGetUserNews,
  ...initStateGetUserNewsSingle,
  ...initStateGetAdminNewsSingle,
  ...initStateUpdateNews,
  ...initStateDeleteNews,
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
    resetUpdateNews(state) {
      state.updateNews = initStateUpdateNews.updateNews;
    },
    resetGetAdminNewsSingle(state) {
      state.getAdminNewsSingle = initStateGetAdminNewsSingle.getAdminNewsSingle;
    },
    resetGetUserNews(state) {
      state.getUserNews = initStateGetUserNews.getUserNews;
    },
    resetGetAdminNewsSingle(state) {
      state.getUserNewsSingle = initStateGetUserNewsSingle.getUserNewsSingle;
    },
  },
  extraReducers: {
    ...reducerGetAdminNews,
    ...reducerCreateNews,
    ...reducerGetUserNews,
    ...reducerGetUserNewsSingle,
    ...reducerGetAdminNewsSingle,
    ...reducerUpdateNews,
    ...reducerDeleteNews,
  },
});
export const { resetGetAdminNews, resetCreateNews, resetGetAdminNewsSingle, resetGetUserNews, resetUpdateNews, resetGetUserNewsSingle } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
