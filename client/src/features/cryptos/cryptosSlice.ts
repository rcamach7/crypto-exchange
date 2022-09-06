import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Crypto } from "../../global.models";
import { RootState } from "../index";

interface CryptosState {
  value: Crypto[];
}

const initialState: CryptosState = {
  value: [],
};

const cryptosSlice = createSlice({
  name: "cryptos",
  initialState,
  reducers: {
    setCryptos: (state, action: PayloadAction<Crypto[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setCryptos } = cryptosSlice.actions;
export const cryptosReducer = cryptosSlice.reducer;
export const selectCryptos = (state: RootState) => state.cryptos.value;
