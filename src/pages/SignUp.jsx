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
import { encrypt, cryptoKey } from "../util/crypto";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 이메일이 올바르게 입력되면 true로 세팅됨
  const [isEmailInsert, setIsEmailInsert] = useState(false);
  const [isClickPasswordInput, setIsClickPasswordInput] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  const { mutateAsync: signUpMutation } = useMutation((userInfo) => userAPI.signUp(userInfo), {
    onSuccess: async (res) => {
      console.log(res);
      alert("성공적으로 회원가입되었습니다..");
      localStorage.setItem("USR", encrypt({ email, password }, cryptoKey));
      document.cookie = "Authorization =; expires=Thu, 01 Jan 1970 00:00:01 GMT; ";
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
        const passwordFormList = /[~!@#$%^&*()_+|<>?:{}]/;
        if (value.length === 1) {
          setIsClickPasswordInput(true);
        }
        // css상 마크 변경하는 부분 추가 필요
        passwordFormList.test(value) ? setIsPasswordCheck(true) : setIsPasswordCheck(false);
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
      return alert(
        `올바른 이메일 형태가 아닙니다. 
이메일은 다음과 같은 도메인 중 하나를 사용해야 합니다.
${emailFormList}`
      );
    }
    setIsEmailInsert(true);
    // pw 값 존재 시 회원가입 HTTP통신 진행
    if (password && passwordFormList.test(password)) {
      signUpMutation({ email, password });
    }
  };

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
        <layout.FlexColumnCenter style={{ padding: "40px 40px 24px 40px", width: "400px", height: "200px", justifyContent: "space-between" }}>
          <LoginHeader style={{ color: `${sVar.black80}` }}>Create your account</LoginHeader>
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: "400",
              width: "320px",
              padding: "0",
              wordBreak: "break-word",
              textAlign: "center",
              lineHeight: "1.5",
            }}
          >
            Please note that phone verification is required for signup. Your number will only be used to verify your identity for security purposes.
          </div>
        </layout.FlexColumnCenter>
        <style.UserForm onSubmit={postUserInfoForSignUp}>
          <NameFloatInput name="email" type="email" changeHandler={changeHandler} value={email} isEmailInsert={isEmailInsert} />
          {isEmailInsert ? <NameFloatInput name="password" type="password" changeHandler={changeHandler} value={password} /> : null}
          {isClickPasswordInput ? (
            <style.ConfirmPasswordFormDiv>
              <span>Your password must contain:</span>
              <ul>
                <li>
                  {/* 나중에 마크 추가 후 isPasswordCheck로 마크 변경되도록 설정 필요 */}
                  <span style={isPasswordCheck ? { color: "green" } : null}>At least 1 exclamation mark</span>
                </li>
              </ul>
            </style.ConfirmPasswordFormDiv>
          ) : null}
          <GreenBtn size="Big">Continue</GreenBtn>
        </style.UserForm>
        <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <Link to={"/login"} style={{ color: `${sVar.loginHLColor90}`, textDecoration: "none", marginLeft: "5px" }}>
            Log in
          </Link>
        </p>
      </layout.FlexColumnCenter100>
    </layout.FlexColumnCenter>
  );
}

export default SignUp;
