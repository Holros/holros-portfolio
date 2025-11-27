import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface InitialState {
  value: boolean;
}

const initialState = {
  value: !!Cookies.get("ACCESS_TOKEN_COOKIE_NAME"),
};

const isLoggedInOptions = {
  name: "isLoggedIn",
  initialState,
  reducers: {
    login: (state: InitialState) => {
      state.value = true;
    },
    logout: (state: InitialState) => {
      state.value = false;
    },
  },
};

const isLoggedInSlice = createSlice(isLoggedInOptions);

export const { login, logout } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
