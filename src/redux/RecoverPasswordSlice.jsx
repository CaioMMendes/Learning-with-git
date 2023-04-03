import { createSlice } from "@reduxjs/toolkit";

export const RecoverPasswordSlice = createSlice({
  name: "recoverPassword",
  initialState: {
    recoverPassword: {
      email: "",
      redirect: false,
    },
  },
  reducers: {
    changeRecoverPassword(state, { payload }) {
      return {
        ...state,
        recoverPassword: payload,
      };
    },
  },
});

export const { changeRecoverPassword } = RecoverPasswordSlice.actions;
export const selectRecoverPassword = (state) => state.recoverPassword;

export default RecoverPasswordSlice.reducer;
