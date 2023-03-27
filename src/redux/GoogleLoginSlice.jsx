import { createSlice } from "@reduxjs/toolkit";

export const googleLoginSlice = createSlice({
  name: "googleLogin",
  initialState: {
    googleLogin: {
      name: "",
      email: false,
      sub: "",
      logado: false,
      disabled: false,
      picture: undefined,
      linkAccount: "",
      googleId: "",
    },
  },
  reducers: {
    changeGoogleLogin(state, { payload }) {
      return {
        ...state,
        googleLogin: payload,
      };
    },
    logout(state) {
      return {
        ...state,
        googleLogin: {
          name: "",
          email: false,
          sub: "",
          logado: false,
          disabled: false,
          picture: undefined,
          linkAccount: "",
          googleId: "",
        },
      };
    },
  },
});

export const { changeGoogleLogin, logout } = googleLoginSlice.actions;
export const selectGoogleLogin = (state) => state.googleLogin;

export default googleLoginSlice.reducer;
