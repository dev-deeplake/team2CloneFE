import { configureStore } from "@reduxjs/toolkit";
import userInfo from "../modules/userInfo";

const store = configureStore({
  reducer: {
    userInfo,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
