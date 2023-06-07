import React, { useState } from "react";
import * as layout from "../styles/layouts";
import { ReactComponent as Eyes } from "../icons/eyes.svg";
import { ReactComponent as NoEyes } from "../icons/noeyes.svg";
import * as sVar from "../styles/styleVariables";
import * as style from "../styles/styles";

function NameFloatInput({ name, changeHandler, value, isEmailInsert = false, canWriteEmail = false }) {
  // div focus 시 보더 변경을 위한 state
  const [isFocus, setIsFocus] = useState(false);
  // password 보여주는 옵션을 위한 state
  const [showPassword, setShowPassword] = useState(false);

  // name(email or password)에 따라 아이콘 변경
  const icon = name === "password" ? showPassword ? <NoEyes /> : <Eyes /> : "Edit";

  // focus 시 border 초록색으로 설정
  const changeBorderToGreen = () => {
    setIsFocus(true);
  };

  // blur 시 border Default 색상으로 변경
  const changeBorderToDefault = () => {
    setIsFocus(false);
  };

  const showPasswordHandler = (event) => {
    setShowPassword(!showPassword);
  };

  const borderColor = isFocus && `${sVar.loginHLColor70}`;
  const type = showPassword ? "text" : "password";

  return name === "email" ? (
    isEmailInsert ? (
      <layout.FlexCenterRow100SpaceBetween>
        <span style={{ border: "none" }}>{value}</span>
        <FuncBtn name={name} onClick={canWriteEmail}>
          {icon}
        </FuncBtn>
      </layout.FlexCenterRow100SpaceBetween>
    ) : (
      <style.LoginInput autoFocus style={{ width: "100%" }} name={name} required onChange={changeHandler} autoComplete="off" type="email" value={value} />
    )
  ) : (
    <layout.FlexCenterRow100SpaceBetween borderColor={borderColor}>
      <input autoFocus onFocus={changeBorderToGreen} onBlur={changeBorderToDefault} name={name} required onChange={changeHandler} autoComplete="off" type={type} value={value} />
      <FuncBtn name={name} showPassword={showPasswordHandler}>
        {icon}
      </FuncBtn>
    </layout.FlexCenterRow100SpaceBetween>
  );
}

// NameFloatInput component 안에서만 사용할 버튼 컴포넌트 생성
function FuncBtn({ children, name, onClick = false, showPassword = false }) {
  const onClickHandler = name === "email" ? onClick : showPassword;
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        onClickHandler();
      }}
      style={{ backgroundColor: "white", border: "none", height: "100%", color: name === "email" && `${sVar.loginHLColor90}` }}
    >
      {children}
    </button>
  );
}

export default NameFloatInput;
