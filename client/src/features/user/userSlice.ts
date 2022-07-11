import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../global.models";

interface UserState {
  value: User | null;
}

const initialState: UserState = {
  value: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      state.value = null;
    },
  },
});

export const { removeUser, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
