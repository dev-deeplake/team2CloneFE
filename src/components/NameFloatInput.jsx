import React from "react";

function NameFloatInput({
  name,
  type,
  changeHandler,
  value,
  isEmailInsert = false,
}) {
  return isEmailInsert && name === "email" ? (
    <input
      name={name}
      required
      onChange={changeHandler}
      autoComplete="off"
      type={type}
      value={value}
      readOnly
    />
  ) : (
    <input
      name={name}
      required
      onChange={changeHandler}
      autoComplete="off"
      type={type}
      value={value}
    />
  );
}

export default NameFloatInput;
