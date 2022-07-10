import { configureStore } from "@reduxjs/toolkit";
import { newsArticlesReducer } from "./newsArticles/newsArticlesSlice";
import { cryptosReducer } from "./cryptos/cryptosSlice";
import { jwtTokenReducer } from "./jwtToken/jwtTokenSlice";
import { userReducer } from "./user/userSlice";

export const store = configureStore({
  reducer: {
    newsArticles: newsArticlesReducer,
    cryptos: cryptosReducer,
    jwtToken: jwtTokenReducer,
    user: userReducer,
  },
});

// Needed for typing our state and dispatch functions anytime they're used in out application.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
