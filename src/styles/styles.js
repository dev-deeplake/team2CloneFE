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
// icon이 들어가는 버튼의 스타일링
export const IconUsingBtn = styled.button`
  width: 244px;
  padding: 12px;
  margin: 5px 0 0 0;
  line-height: 1.25rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  background-color: transparent;
  border: none;
  color: ${sVar.white90};
  &:hover {
    box-shadow: 100px 100px ${sVar.darkLightened60} inset;
  }
  display: flex;
  align-items: center;
  > div {
    color: ${sVar.white90};
    line-height: 1.25rem;
    font-size: 0.875rem;
  }
`;
// main 화면에서 GPT 모델 노출 부분의 스타일링
export const MainHeader = styled(layout.FlexCenter100)`
    background-color: ${sVar.bgReplColor};
    color: ${sVar.black70};
`
// main 화면 아래쪽의 inputarea 스타일링
export const MainInputContainer = styled(layout.FlexCenterRow100)`
    max-width: 672px;
    width: 100%;
    min-height: 50px;
    border-radius: 4px;
    box-shadow: 1px 1px ${sVar.black05};
    position: fixed;
    bottom: 52px;
    border: 1px solid black;
    padding: 7px 0 7px 16px;
`
export const MainInput = styled.textarea`
  box-sizing: border-box;
  display: flex;
  max-width: 654px;
  width: 92%;
  padding: 4px;
  flex-wrap: wrap;
  max-height: 200px;
  line-height: 1.5em;
  ${props => {
    if (!!props.height) {
      return `height: ${props.height};`
    }
  }}
`

// nav 컨테이너 스타일링
export const NavContainer = styled(layout.FlexColumnCenter)`
    min-width: 260px;
    padding: 10px 10px;
    height: 100vh;
    justify-content: flex-start;
    background-color: ${sVar.darkSide};
`

// nav group text 스타일링
export const GroupText = styled.p`
    color: ${sVar.groupTextColor};
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 500;
    padding: 0.75rem 0.75rem 0.3rem 0.75rem;
`

// userIcon 스타일링
export const UserIcon = styled(layout.FlexCenter100)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  color: ${sVar.white80};
  font-size: 0.1rem;
  border-radius: 0.1rem;
`