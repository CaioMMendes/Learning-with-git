import { createSlice } from "@reduxjs/toolkit";

export const isLoggedSlice = createSlice({
  name: "isLogged",
  initialState: {
    isLogged: {
      name: "",
      logado: false,
      email: "",
    },
  },
  reducers: {
    changeIsLogged(state, { payload }) {
      return {
        ...state,
        isLogged: payload,
      };
    },
    logout(state) {
      return {
        ...state,
        isLogged: {
          name: "",
          logado: false,
          email: "",
        },
      };
    },
  },
});

export const { changeIsLogged, logout } = isLoggedSlice.actions;
export const selectIsLogged = (state) => state.isLogged;

export default isLoggedSlice.reducer;
