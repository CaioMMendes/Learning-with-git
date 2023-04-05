import { createSlice } from "@reduxjs/toolkit";

export const avatarImage = createSlice({
  name: "avatarImage",
  initialState: {
    image: null,
  },
  reducers: {
    changeAvatarImage(state, { payload }) {
      return {
        ...state,
        image: payload,
      };
    },
  },
});

export const { changeAvatarImage } = avatarImage.actions;
export const selectAvatarImage = (state) => state.image;

export default avatarImage.reducer;
