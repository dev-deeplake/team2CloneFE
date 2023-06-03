import axios from "axios";
import { getCookie } from "../util/cookie";
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/`,
  withCredentials: true,
  headers: {
    Authorization: null,
    // withCredentials: true,
    // "Content-Type": "application/json",
  },
});
// 요청 인터셉트
// 설정된 기능 : 인터셉트하여 console에 찍어줌
instance.interceptors.request.use(
  function (config) {
    // const checkCookie = document.cookie ? decodeURIComponent(document.cookie.split("=")[1].replace(/\+/g, " ")) : null;
    const checkCookie = getCookie("Authorization");
    const cookie = !!checkCookie ? checkCookie : null;
    config.headers.Authorization = cookie;
    console.log("request is ", config);
    return config;
  },
  function (error) {
    console.log("request error", error);
    return Promise.reject(error);
  }
);
// 응답 인터셉트
// 설정된 기능 : 인터셉트하여 console에 찍어줌
instance.interceptors.response.use(
  function (response) {
    console.log("response is ", response);
    return response;
  },
  function (error) {
    console.log(`
    Http status code : ${error.message}
    `);
    return Promise.reject(error);
  }
);
export const userAPI = {
  // user 정보 관련
  login: async (userInfo) => await instance.post("/login", userInfo),
  signUp: async (userInfo) => await instance.post("/signup", userInfo),
  logout: async () => await instance.post("/logout", null),
  getCredit: async () => await instance.get("/credit"),
};
export const gptAPI = {
  // layout (nav + main)에서 사용
  getChats: async () => await instance.get("/chat"),
  makeChat: async (ask) => await instance.post("/chat", ask),
};
export default instance;
