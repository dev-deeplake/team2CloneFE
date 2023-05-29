import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  nickname: "choi",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      return (state = {
        ...state,
        [action.payload.name]: action.payload.value,
      });
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
