import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as sVar from "../styles/styleVariables";

const GreenBtnStyle = styled.button`
  width: auto;
  padding: 8px 12px;
  background-color: ${sVar.loginHLColor90};
  border-radius: 4px;
  color: ${sVar.white100};
  border: 1px solid ${sVar.loginHLColor100};
  margin: 10px 5px 10px 5px;
  font-weight: 100;
  &:hover {
    box-shadow: 100px 100px inset ${sVar.black20};
  }
  ${(props) => {
    if (props.size === "big") {
      return `
          width: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        `;
    }
  }}
`;

function GreenBtn({ size = "small", children }) {
  const navigate = useNavigate();
  return (
    <GreenBtnStyle
      onClick={
        children === "Log in"
          ? () => navigate("/login")
          : children === "Sign up"
          ? () => navigate("/signup")
          : null
      }
      size={size}
    >
      {children}
    </GreenBtnStyle>
  );
}

export default GreenBtn;
