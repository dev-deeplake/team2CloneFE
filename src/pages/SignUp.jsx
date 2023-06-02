import React, { useEffect, useState } from "react";
import * as layout from "../styles/layouts";
import * as style from "../styles/styles";
import * as sVar from "../styles/styleVariables";
import { ReactComponent as Logo } from "../icons/logo.svg";
import NameFloatInput from "../components/NameFloatInput";
import LoginHeader from "../components/LoginHeader";
import { useMutation } from "react-query";
import { userAPI } from "../axios/api";
import GreenBtn from "../components/GreenBtn";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userEmail, userPassword } from "../recoil/userInfo/atoms";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useRecoilState(userEmail);
  const [password, setPassword] = useState("");
  // 이메일이 올바르게 입력되면 true로 세팅됨
  const [isEmailInsert, setIsEmailInsert] = useState(false);

  const { mutateAsync: signUpMutation } = useMutation((userInfo) => userAPI.signUp(userInfo), {
    onSuccess: async (res) => {
      console.log(res);
      alert("성공적으로 회원가입되었습니다..");
      navigate("/login");
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

  const postUserInfoForSignUp = (event) => {
    event.preventDefault();
    // 이메일 허용 양식
    const emailFormList = ["naver.com", "gmail.com", "hanmail.net", "kakao.com"];
    // 입력한 이메일이 허용 양식 중에 있는지 확인
    const passwordFormList = /[~!@#$%^&*()_+|<>?:{}]/;
    const boolCheckEmailForm = !emailFormList.filter((form) => email.split("@")[1] === form).length;
    // 없으면 알람 발생
    if (boolCheckEmailForm) {
      return alert("올바른 이메일 형태가 아닙니다. 다시 작성해주세요");
    }
    setIsEmailInsert(true);
    // pw 값 존재 시 회원가입 HTTP통신 진행
    if (password && passwordFormList.test(password)) {
      signUpMutation({ email, password });
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("Email")) {
      navigate("/layout");
    }
  });

  return (
    <layout.FlexColumnCenter>
      <layout.FlexCenter100 style={{ paddingTop: "32px" }}>
        <Logo />
      </layout.FlexCenter100>
      <layout.FlexColumnCenter100 style={{ padding: "80px" }}>
        <LoginHeader style={{ color: `${sVar.black80}` }}>Welcome back</LoginHeader>
        <p
          style={{
            width: "320px",
            wordBreak: "break-word",
            textAlign: "center",
          }}
        >
          Please note that phone verification is required for signup. Your number will only be used to verify your identity for security purposes.
        </p>
        <style.UserForm onSubmit={postUserInfoForSignUp}>
          <NameFloatInput name="email" type="email" changeHandler={changeHandler} value={email} isEmailInsert={isEmailInsert} />
          {isEmailInsert ? <NameFloatInput name="password" type="password" changeHandler={changeHandler} value={password} /> : null}
          <GreenBtn size="Big">Continue</GreenBtn>
        </style.UserForm>
        <p>
          Already have an account? <Link to={"/login"}>Log in</Link>
        </p>
      </layout.FlexColumnCenter100>
    </layout.FlexColumnCenter>
  );
}

export default SignUp;
