import styled from "styled-components";
import * as layout from "../styles/layouts";
import * as sVar from "../styles/styleVariables";

// 로그인 및 회원가입시 heading 스타일 설정
export const Heading = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-top: 24px;
`;

// 로그인 및 회원가입시 사용되는 form
export const UserForm = styled(layout.FlexColumnForm)`
  text-align: left;
  width: 320px;
  > input {
    width: inherit;
    height: 52px;
    padding: 0;
  }
  > button {
    width: inherit;
    height: 52px;
  }
`;

// 이하 메인 대화 화면에서 사용되는 styles
export const IconUsingBtn = styled.button`
  width: 244px;
  &:hover {
    box-shadow: 100px 100px ${sVar.white100} inset;
  }
`;

export const MainHeader = styled(layout.FlexCenter100)`
    background-color: ${sVar.bgReplColor};
    color: ${sVar.black70};
`

export const MainInput = styled.div`
    max-width: 672px;
    width: 100%;
    border-radius: 4px;
    box-shadow: 1px 1px ${sVar.black05};
    position: fixed;
    bottom: 52px;
    border: 1px solid black;

    > textarea {
        max-width: 654px;
        width: 95%;
    }
`
