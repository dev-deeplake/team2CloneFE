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
  // 이메일 형식 확인용 state
  const [isEmailInsert, setIsEmailInsert] = useState(false);
  // 패스워드 형식 확인용 state
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  // 패스워드 입력 시 형식 안내 및 확인할 수 있는 박스 생성을 위한 state
  const [isClickPasswordInput, setIsClickPasswordInput] = useState(false);

  const { mutateAsync: signUpMutation } = useMutation((userInfo) => userAPI.signUp(userInfo), {
    //회원가입 성공
    // 1. 이메일과 비밀번호 암호화하여 localStorage에 저장
    // 2. 현재 저장되어 있는 쿠키 삭제
    // 3. 로그인 페이지로 이동
    onSuccess: (res) => {
      console.log(res);
      alert("성공적으로 회원가입되었습니다..");
      localStorage.setItem("USR", encrypt({ email, password }, cryptoKey));
      document.cookie = "Authorization =; expires=Thu, 01 Jan 1970 00:00:01 GMT; ";
      navigate("/login");
    },
    // 회원가입 실패
    // 해당 내용 알람
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
        // 비밀번호 입력 시 비밀번호 형식 및 확인할 수 있는 부분 띄우도록 설정
        if (value.length === 1) {
          setIsClickPasswordInput(true);
        }
        // 비밀번호 형식 체크
        const passwordFormList = /[~!@#$%^&*()_+|<>?:{}]/;
        passwordFormList.test(value) ? setIsPasswordCheck(true) : setIsPasswordCheck(false);
        break;
      default:
        break;
    }
  };

  // form 제출시
  // 1. 이메일 입력 시 : 이메일 형식 확인
  // 2. 비밀번호 입력 시 : 비밀번호 형식 확인
  const postUserInfoForSignUp = (event) => {
    event.preventDefault();
    isEmailInsert ? checkUserPassword() : checkUserEmail();
  };

  // 비밀번호 형식 확인
  const checkUserPassword = () => {
    const passwordFormList = /[~!@#$%^&*()_+|<>?:{}]/;
    if (password && passwordFormList.test(password)) {
      signUpMutation({ email, password });
    } else {
      alert(`비밀번호 형태를 확인하세요.
비밀번호는 적어도 1개의 특수문자를 포함해야 합니다.`);
    }
  };

  // 이메일 형식 확인
  const checkUserEmail = (event) => {
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
    // 이메일 수정기능 이용 시 이메일 형식확인 후 다시 비밀번호 형식 확인 박스 띄워줄 필요에 따라 추가
    if (password.length >= 1) {
      setIsClickPasswordInput(true);
    }
    if (password && passwordFormList.test(password)) {
      setIsPasswordCheck(true);
    }
  };

  // Edit 버튼 클릭 시 이메일 수정가능하도록 설정
  const canWriteEmail = () => {
    setIsEmailInsert(false);
    setIsClickPasswordInput(false);
  };

  // Enter키와 form 연결
  const enterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      isEmailInsert ? checkUserPassword() : checkUserEmail();
    }
  };

  // 로그인 한 상태에서 회원가입 페이지로 이동 시 메인 페이지로 자동 이동하도록 설정
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
        <style.UserForm onSubmit={postUserInfoForSignUp} onKeyDown={enterKey}>
          <NameFloatInput name="email" type="email" changeHandler={changeHandler} value={email} isEmailInsert={isEmailInsert} canWriteEmail={canWriteEmail} />
          {isEmailInsert ? <NameFloatInput name="password" type="password" changeHandler={changeHandler} value={password} /> : null}
          {isClickPasswordInput ? (
            <style.ConfirmPasswordFormDiv>
              <span>Your password must contain:</span>
              <ul>
                <li>
                  {/* 나중에 마크 추가 후 isPasswordCheck로 마크 변경되도록 설정 필요 */}
                  <span style={isPasswordCheck ? { color: `${sVar.loginHLColor80}` } : null}>At least 1 exclamation mark</span>
                </li>
              </ul>
            </style.ConfirmPasswordFormDiv>
          ) : null}
          <GreenBtn size="Big">Continue</GreenBtn>
        </style.UserForm>
        <p style={{ marginTop: "10px", fontSize: "0.85rem" }}>
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
