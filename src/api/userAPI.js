import axios from "axios";

const server_URL = process.env.REACT_APP_SERVER_URL;

export const signUp = (userInfo) => {
  try {
    const response = axios.post(`${server_URL}/api/signup`, userInfo);
    return response;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const login = (userInfo) => {
  try {
    const response = axios.post(`${server_URL}/api/login`, userInfo);
    return response;
  } catch (err) {
    console.log(err);
    alert("로그인 도중 문제가 발생했습니다.");
  }
};

export const getCredit = () => {
  try {
    const response = axios.get(`${server_URL}/api/credit`, {
      headers: { Authorization: document.cookie.split("=")[1] },
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

export const logout = () => {
  try {
    const response = axios.post(`${server_URL}/api/logout`, null, {
      headers: { Authorization: document.cookie.split("=")[1] },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
