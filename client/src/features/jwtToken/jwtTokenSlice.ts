import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JwtTokenState {
  value: String | null;
}

const initialState: JwtTokenState = {
  value: localStorage.getItem("token"),
};

export const jwtTokenSlice = createSlice({
  name: "jwtToken",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem("token", action.payload);
      state.value = action.payload;
    },
    removeToken: (state) => {
      localStorage.removeItem("token");
      state.value = null;
    },
  },
});

export const { removeToken, setToken } = jwtTokenSlice.actions;
export const jwtTokenReducer = jwtTokenSlice.reducer;
