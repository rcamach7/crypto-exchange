import { configureStore } from "@reduxjs/toolkit";
import { newsArticlesReducer } from "./newsArticles/newsArticlesSlice";

export const store = configureStore({
  reducer: { newsArticles: newsArticlesReducer },
});

// Needed for typing our state and dispatch functions anytime they're used in out application.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
