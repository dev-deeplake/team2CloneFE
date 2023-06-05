import React from "react";
import * as style from "../styles/styles";

function LoginHeader({ children, userStyle }) {
  return <style.Heading style={{ userStyle }}>{children}</style.Heading>;
}

export default LoginHeader;
