import axios from "axios";
import { get } from "react-cookie";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
        withCredentials: true,
        "Content-Type": "application/json"
    }
})

instance.interceptors.request.use((config) => {
    // request가 보내지기 전에 반영할 요청
    console.log(get("Authorization"))
    // console.log("here!:::", useCookies["Authorization"])
    // if (!!useCookies["Authorization"]) {
        // const [cookies, setCookie, removeCookie] = useCookies["jwt"]
        // if (cookies.jwt) {
        //     config.headers.Authorization = `Bearer ${cookies.jwt}`;
        // }
    // }

    return config; 
}, (error) => { // 에러시의 처리
    console.log("req err:::", error);
    return Promise.reject(error);
})


export const gptAPI = {
    // layout (nav + main)에서 사용
    getCredit: async () => await instance.get("/api/credit")
}

export default instance;