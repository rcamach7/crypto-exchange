import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JwtTokenState {
  value: String | null;
}

const initialState: JwtTokenState = {
  value: null,
};

export const jwtTokenSlice = createSlice({
  name: "jwtToken",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<String>) => {
      state.value = action.payload;
    },
    removeToken: (state) => {
      state.value = null;
    },
  },
});

export const { removeToken, setToken } = jwtTokenSlice.actions;
export const jwtTokenReducer = jwtTokenSlice.reducer;
