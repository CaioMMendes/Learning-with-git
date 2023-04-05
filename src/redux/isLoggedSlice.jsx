import { createSlice } from "@reduxjs/toolkit";

export const isLoggedSlice = createSlice({
  name: "isLogged",
  initialState: {
    isLogged: {
      name: "",

      email: "",
      img: "",
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

          email: "",
          img: null,
        },
      };
    },
  },
});

export const { changeIsLogged, logout } = isLoggedSlice.actions;
export const selectIsLogged = (state) => state.isLogged;

export default isLoggedSlice.reducer;
