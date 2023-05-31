import axios from "axios";

// axios 인스턴스 생성 및 인스턴스 defaults 설정
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/`,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
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

// 인스턴스 이용하여 HTTP request 생성
export const login = (userInfo) => instance.post("/login", userInfo);
export const signUp = (userInfo) => instance.post("/signup", userInfo);
export const logout = () => instance.post("/logout", null);
