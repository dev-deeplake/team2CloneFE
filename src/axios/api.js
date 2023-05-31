import axios from "axios";
import { get } from "react-cookie";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/`,
  // withCredentials: true,
  headers: {
    withCredentials: true,
    "Content-Type": "application/json",
  },
});

// 요청 인터셉트
// 설정된 기능 : 인터셉트하여 console에 찍어줌
instance.interceptors.request.use(
  function (config) {
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
      console.log("response error", error);
      return Promise.reject(error);
    }
  );

export const userAPI = {
    // user 정보 관련
    login: (userInfo) => instance.post("/login", userInfo),
    signUp: (userInfo) => instance.post("/signup", userInfo),
    logout: () => instance.post("/logout", null)
}

export const gptAPI = {
  // layout (nav + main)에서 사용
  getCredit: async () => await instance.get("/api/credit"),
};

export default instance;
