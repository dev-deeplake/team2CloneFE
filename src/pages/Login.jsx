import React, { useEffect, useState } from "react";
import * as layout from "../styles/layouts";
import * as style from "../styles/styles";
import * as sVar from "../styles/styleVariables";
import { ReactComponent as Logo } from "../icons/logo.svg";
import NameFloatInput from "../components/NameFloatInput";
import LoginHeader from "../components/LoginHeader";
import GreenBtn from "../components/GreenBtn";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { userAPI } from "../axios/api";
import { setCookie } from "../util/cookie";
import { useRecoilState } from "recoil";
import { userEmail, userPassword } from "../recoil/userInfo/atoms";
import { cryptoKey, encrypt, decrypt } from "../util/crypto";

function Login() {
  const navigate = useNavigate();

  const [isEmailInsert, setIsEmailInsert] = useState(false);

  const [email, setEmail] = useState(""); // 읽기 & 쓰기 모두 됨
  const [password, setPassword] = useState("");

  const setCookieExpireDay = (day) => {
    let expireDay = new Date();
    expireDay.setHours(expireDay.getHours() + day * 24 + 9);
    return expireDay;
  };

  const { mutateAsync: loginMutation } = useMutation((userInfo) => userAPI.login(userInfo), {
    onSuccess: (res) => {
      setCookie("Authorization", res.data["data"].Authorization, {
        path: "/", // '/'설정시 : 모든 하위 도메인에서 쿠키 사용 가능 ex) domain: naver.com => 하위 domain : news.naver.com
        // secure: true, // https 프로토콜 사용 시에만 쿠키 전송 가능, 서드 파티 쿠키(다른 도메인으로의 전송 필요한 쿠키) 사용시 sameSite: none과 같이 사용
        sameSite: "strict", // 퍼스트 파티 쿠키만 전송 : 동일 도메인에만 쿠키 전송 가능, 향후 CSRF 문제를 해결하기 위해 적용
        // domain: "gptclone.cz", // 전송되어질 도메인(서버 도메인)
        expires: setCookieExpireDay(1), // 만료 시간 설정 시 브라우저 종료 시 삭제되지 않음 : 향후 자동롤그인 기능 구현 시 쿠키 사용할 예정
      });
      localStorage.setItem("USR", encrypt({ email, password }, cryptoKey)); // email을 암호화하여 sessionStorage에 저장
      sessionStorage.setItem("Login", true);
      alert(res.data["message"]);
      navigate("/");
    },
  });

  const changeHandler = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const autoSetEmail = () => {
    if (localStorage.getItem("USR")) {
      setEmail(decrypt(localStorage.getItem("USR"), cryptoKey).email);
    }
  };

  const checkUserEmail = () => {
    // 이메일 허용 양식
    const emailFormList = ["naver.com", "gmail.com", "hanmail.net", "kakao.com"];
    // 입력한 이메일이 허용 양식 중에 있는지 확인
    const boolCheckEmailForm = !emailFormList.filter((form) => email.split("@")[1] === form).length;
    // 없으면 알람 발생
    if (boolCheckEmailForm) {
      return alert("올바른 이메일 형태가 아닙니다. 다시 작성해주세요");
    }
    setIsEmailInsert(true);
    if (!!localStorage.getItem("USR")) {
      setPassword(decrypt(localStorage.getItem("USR"), cryptoKey).password);
    }
  };

  const checkUserPassword = () => {
    const passwordFormList = /[~!@#$%^&*()_+|<>?:{}]/;
    if (password && passwordFormList.test(password)) {
      loginMutation({ email, password });
    }
  };

  const postUserInfoForSignUp = (event) => {
    event.preventDefault();
    isEmailInsert ? checkUserPassword() : checkUserEmail();
  };

  useEffect(() => {
    if (sessionStorage.getItem("Login")) {
      navigate("/");
    }
    autoSetEmail();
  });

  return (
    <layout.FlexColumnCenter>
      <layout.FlexCenter100 style={{ paddingTop: "32px" }}>
        <Logo />
      </layout.FlexCenter100>
      <layout.FlexColumnCenter100 style={{ padding: "80px" }}>
        <LoginHeader style={{ color: `${sVar.black80}` }}>Welcome back</LoginHeader>
        <style.UserForm onSubmit={postUserInfoForSignUp}>
          <NameFloatInput name="email" type="email" changeHandler={changeHandler} value={email} isEmailInsert={isEmailInsert} />
          {isEmailInsert ? <NameFloatInput name="password" type="password" changeHandler={changeHandler} value={password} /> : null}
          <GreenBtn size="Big">Continue</GreenBtn>
        </style.UserForm>
        <p>
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </p>
      </layout.FlexColumnCenter100>
    </layout.FlexColumnCenter>
  );
}

export default Login;
