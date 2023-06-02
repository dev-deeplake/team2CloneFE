import { atom } from "recoil";

// recoil atom (가장 작은 state) 생성
export const userEmail = atom({
  key: "email",
  default: "",
});
