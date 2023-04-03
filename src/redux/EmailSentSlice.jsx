import { createSlice } from "@reduxjs/toolkit";

export const EmailSentSlice = createSlice({
  name: "emailSent",
  initialState: {
    emailSent: {
      email: "",
      redirect: false,
    },
  },
  reducers: {
    changeEmailSent(state, { payload }) {
      return {
        ...state,
        emailSent: payload,
      };
    },
  },
});

export const { changeEmailSent } = EmailSentSlice.actions;
export const selectEmailSent = (state) => state.emailSent;

export default EmailSentSlice.reducer;
