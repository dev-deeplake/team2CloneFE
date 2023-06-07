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
import { cryptoKey, encrypt, decrypt } from "../util/crypto";

function Login() {
  const navigate = useNavigate();

  // 이메일 입력됐는 지 확인하는 state
  const [isEmailInsert, setIsEmailInsert] = useState(false);

  // 자동완성 기능 - 로그인 페이지 접속 시 로컬스토리지에 유저정보가 있다면 해당 값으로 기본 값 설정
  const defaultEmail = !!localStorage.getItem("USR") ? decrypt(localStorage.getItem("USR"), cryptoKey).email : "";
  const defaultPassword = !!localStorage.getItem("USR") ? decrypt(localStorage.getItem("USR"), cryptoKey).password : "";
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);

  // 쿠키 유효기간 설정 함수- Day기준
  const setCookieExpireDay = (day) => {
    let expireDay = new Date();
    expireDay.setHours(expireDay.getHours() + day * 24 + 9);
    return expireDay;
  };

  const { mutateAsync: loginMutation } = useMutation((userInfo) => userAPI.login(userInfo), {
    // 로그인 성공 시
    // 1. 쿠키 저장 - 유효기간 1일
    // 2. 로컬스토리지에 유저정보 암호화하여 저장
    // 3. 로그인여부 확인 - 세션스토리지에 로그인 저장, 로그아웃 삭제
    // 4. 메인페이지로 이동
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
      sessionStorage.removeItem("Logout");

      alert(res.data["message"]);
      navigate("/");
    },
    // 로그인 실패 시 알람 띄우기
    onError: (err) => {
      alert(err.response.data.message);
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

  const postUserInfoForLogin = (event) => {
    event.preventDefault();
    isEmailInsert ? loginMutation({ email, password }) : checkUserEmail();
  };

  // 이메일이 올바른 형식이 아니면 알람 띄움
  // 비밀 번호의 경우 잘 못 보낼 시 서버에서 주는 error 메시지 알람주는 형태
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
  };

  const canWriteEmail = (event) => {
    setIsEmailInsert(false);
  };

  const enterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      isEmailInsert ? loginMutation({ email, password }) : checkUserEmail();
    }
  };

  // 로그인 성공 시 로그인페이지 접속 못하도록 설정
  useEffect(() => {
    if (sessionStorage.getItem("Login")) {
      navigate("/");
    }
  });

  return (
    <layout.FlexColumnCenter>
      <layout.FlexCenter100 style={{ paddingTop: "32px" }}>
        <Logo />
      </layout.FlexCenter100>
      <layout.FlexColumnCenter100 style={{ padding: "80px" }}>
        <layout.FlexColumnCenter style={{ padding: "40px 40px 24px 40px", width: "400px", height: "136px", justifyContent: "space-between" }}>
          <LoginHeader style={{ color: `${sVar.black80}` }}>Welcome back</LoginHeader>
        </layout.FlexColumnCenter>
        <style.UserForm onSubmit={postUserInfoForLogin} onKeyDown={enterKey}>
          <NameFloatInput name="email" changeHandler={changeHandler} value={email} isEmailInsert={isEmailInsert} canWriteEmail={canWriteEmail} />
          {isEmailInsert ? <NameFloatInput name="password" changeHandler={changeHandler} value={password} /> : null}
          <GreenBtn size="Big">Continue</GreenBtn>
        </style.UserForm>
        <p style={{ marginTop: "10px", fontSize: "0.85rem" }}>
          Don't have an account?{" "}
          <Link to={"/signup"} style={{ color: `${sVar.loginHLColor90}`, textDecoration: "none", marginLeft: "5px" }}>
            Sign up
          </Link>
        </p>
      </layout.FlexColumnCenter100>
    </layout.FlexColumnCenter>
  );
}

export default Login;
