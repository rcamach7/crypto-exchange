import { configureStore } from "@reduxjs/toolkit";
import {
  newsArticlesReducer,
  cryptosReducer,
  jwtTokenReducer,
  userReducer,
} from "./index";

export const store = configureStore({
  reducer: {
    newsArticles: newsArticlesReducer,
    cryptos: cryptosReducer,
    jwtToken: jwtTokenReducer,
    user: userReducer,
  },
});

// Needed for typing our state and dispatch functions anytime they're used in our application.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
