import React from "react";
import * as layout from "../styles/layouts";
import { ReactComponent as eyes } from "../icons/showPassword.svg";

function NameFloatInput({ name, type, changeHandler, value, isEmailInsert = false }) {
  return isEmailInsert && name === "email" ? (
    <layout.Flex>
      <span>{value}</span>
      <eyes />
    </layout.Flex>
  ) : (
    <input name={name} required onChange={changeHandler} autoComplete="off" type={type} value={value} />
  );
}

export default NameFloatInput;
