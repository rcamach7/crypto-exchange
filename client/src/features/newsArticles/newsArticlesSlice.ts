import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsArticle } from "../../global.models";
import { RootState } from "../index";

// Define a type for the slice state
interface NewsArticlesState {
  value: NewsArticle[];
}

// Define the initial state using that type
const initialState: NewsArticlesState = { value: [] };

export const newsArticlesSlice = createSlice({
  name: "newsArticles",
  initialState,
  reducers: {
    setNewsArticles: (state, action: PayloadAction<NewsArticle[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setNewsArticles } = newsArticlesSlice.actions;

export const newsArticlesReducer = newsArticlesSlice.reducer;

// Selectors can use the imported RootState
export const selectNewsArticles = (state: RootState) =>
  state.newsArticles.value;
