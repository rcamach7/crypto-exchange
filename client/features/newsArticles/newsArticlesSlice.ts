import { createSlice } from "@reduxjs/toolkit";

export const newsArticlesSlice = createSlice({
  name: "newsArticles",
  initialState: { value: null },
  reducers: {
    setNewsArticles: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setNewsArticles } = newsArticlesSlice.actions;

export const newsArticlesReducer = newsArticlesSlice.reducer;
