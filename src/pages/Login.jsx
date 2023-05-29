import React, { useEffect, useState } from "react";
import * as layout from "../styles/layouts";
import * as style from "../styles/styles";
import * as sVar from "../styles/styleVariables";
import { ReactComponent as Logo } from "../icons/logo.svg";
import NameFloatInput from "../components/NameFloatInput";
import LoginHeader from "../components/LoginHeader";
import GreenBtn from "../components/GreenBtn";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/modules/userInfo";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useCookies } from "react-cookie";
import { login } from "../api/userAPI";

function Login() {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const [isEmailInsert, setIsEmailInsert] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const { mutateAsync: loginMutation } = useMutation(
    (userInfo) => login(userInfo),
    {
      onSuccess: async (res) => {
        console.log(res);
        setCookie("token", res.data["token"], { path: "/" });
        alert(res.data["message"]);
        navigate("/layout");
      },
    }
  );

  const changeHandler = ({ target }) => {
    const { name, value } = target;
    dispatch(setUserInfo({ name, value }));
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
      (form) => userInfo.email.split("@")[1] === form
    ).length;
    // 없으면 알람 발생
    if (boolCheckEmailForm) {
      return alert("올바른 이메일 형태가 아닙니다. 다시 작성해주세요");
    }
    setIsEmailInsert(true);
    // pw 값 존재 시 회원가입 HTTP통신 진행
    if (userInfo.password.length !== 0) {
      loginMutation(userInfo);
    }
  };

  useEffect(() => {
    console.log(cookies);
  }, [cookies]);

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
            value={userInfo.email}
            isEmailInsert={isEmailInsert}
          />
          {isEmailInsert ? (
            <NameFloatInput
              name="password"
              type="password"
              changeHandler={changeHandler}
              value={userInfo.password}
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
