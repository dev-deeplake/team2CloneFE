import React, { useState } from "react";
import * as layout from "../styles/layouts";
import * as style from "../styles/styles";
import * as sVar from "../styles/styleVariables";
import { ReactComponent as Logo } from "../icons/logo.svg";
import NameFloatInput from "../components/NameFloatInput";
import LoginHeader from "../components/LoginHeader";
import GreenBtn from "../components/GreenBtn";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { login } from "../api/userAPI";
import { setCookie, getCookie } from "../util/cookie";
import { useRecoilState } from "recoil";
import { userEmail, userPassword } from "../recoil/userInfo/atoms";

function Login() {
  const [isEmailInsert, setIsEmailInsert] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useRecoilState(userEmail);
  const [password, setPassword] = useRecoilState(userPassword);

  const { mutateAsync: loginMutation } = useMutation(
    (userInfo) => login(userInfo),
    {
      onSuccess: (res) => {
        setCookie("Authorization", res.data["token"], {
          path: "/",
          secure: true,
          sameSite: "none",
        });
        console.log(getCookie("Authorization"));
        alert(res.data["message"]);
        navigate("/layout");
      },
    }
  );

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

  const postUserInfoForSignUpFunction = () => {
    // 이메일 허용 양식
    const emailFormList = [
      "naver.com",
      "gmail.com",
      "hanmail.net",
      "kakao.com",
    ];
    // 입력한 이메일이 허용 양식 중에 있는지 확인
    const boolCheckEmailForm = !emailFormList.filter(
      (form) => email.split("@")[1] === form
    ).length;
    // 없으면 알람 발생
    if (boolCheckEmailForm) {
      return alert("올바른 이메일 형태가 아닙니다. 다시 작성해주세요");
    }
    setIsEmailInsert(true);
    // pw 값 존재 시 회원가입 HTTP통신 진행
    if (password.length !== 0) {
      loginMutation({ email, password });
    }
  };

  return (
    <layout.FlexColumnCenter>
      <layout.FlexCenter100 style={{ paddingTop: "32px" }}>
        <Logo />
      </layout.FlexCenter100>
      <layout.FlexColumnCenter100 style={{ padding: "80px" }}>
        <LoginHeader style={{ color: `${sVar.black80}` }}>
          Welcome back
        </LoginHeader>
        <style.UserForm
          onSubmit={(event) => {
            event.preventDefault();
            postUserInfoForSignUpFunction();
          }}
        >
          <NameFloatInput
            name="email"
            type="email"
            changeHandler={changeHandler}
            value={email}
            isEmailInsert={isEmailInsert}
          />
          {isEmailInsert ? (
            <NameFloatInput
              name="password"
              type="password"
              changeHandler={changeHandler}
              value={password}
            />
          ) : null}
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
