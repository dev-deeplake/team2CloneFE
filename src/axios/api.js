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
  timeout: 60000, //axios timeout 추가
});
// 요청 인터셉트
// 설정된 기능 : 인터셉트하여 console에 찍어줌
instance.interceptors.request.use(
  function (config) {
    // const checkCookie = document.cookie ? decodeURIComponent(document.cookie.split("=")[1].replace(/\+/g, " ")) : null;
    const checkCookie = getCookie("Authorization");
    const cookie = !!checkCookie ? checkCookie : null;
    config.headers.Authorization = cookie;
    console.log(`${config.url} request is`, config);
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
    console.log(`${response.config.url} response is`, response);
    return response;
  },
  function (error) {
    console.log(`${error.config.url} error : ${error.message}`);
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
  getConvs: async (chatId) => await instance.get(`/chat/${chatId}`),
  makeChat: async (ask) => await instance.post("/chat", ask),
  continueChat: async (ask, chatId) => await instance.post(`chat/${chatId}`, ask)
};
export default instance;
