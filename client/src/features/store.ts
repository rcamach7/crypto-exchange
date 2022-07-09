import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});

// Needed for typing our state and dispatch functions anytime they're used in out application.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
