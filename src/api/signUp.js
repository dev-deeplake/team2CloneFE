import axios from "axios";

const server_URL = process.env.REACT_APP_SERVER_URL;

export const signUp = (userInfo) => {
  try {
    const response = axios.post(`${server_URL}/api/signup`, userInfo);
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
