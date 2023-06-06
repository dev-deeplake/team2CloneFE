import React, { useState } from "react";
import * as layout from "../styles/layouts";
import { ReactComponent as Eyes } from "../icons/eyes.svg";
import { ReactComponent as NoEyes } from "../icons/noeyes.svg";

function NameFloatInput({ name, changeHandler, value, isEmailInsert = false, canWriteEmail = false }) {
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const icon = name === "password" ? showPassword ? <NoEyes /> : <Eyes /> : "Edit";

  const changeBorderToGreen = () => {
    setIsFocus(true);
  };

  const changeBorderToDefault = () => {
    setIsFocus(false);
  };

  const showPasswordHandler = (event) => {
    setShowPassword(!showPassword);
  };

  const borderColor = isFocus && "green";
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
      <input autoFocus style={{ width: "100%" }} name={name} required onChange={changeHandler} autoComplete="off" type="email" value={value} />
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

function FuncBtn({ children, name, onClick = false, showPassword = false }) {
  const onClickHandler = name === "email" ? onClick : showPassword;
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        onClickHandler();
      }}
      style={{ backgroundColor: "white", border: "none", height: "100%", color: name === "email" && "green" }}
    >
      {children}
    </button>
  );
}

export default NameFloatInput;
