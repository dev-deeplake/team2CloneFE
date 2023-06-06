import styled, { keyframes } from "styled-components";
import * as layout from "../styles/layouts";
import * as sVar from "../styles/styleVariables";

// 로그인 및 회원가입시 heading 스타일 설정
export const Heading = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-top: 24px;
`;

// 로그인 및 회원가입시 사용되는 form
export const UserForm = styled(layout.FlexColumnForm)`
  text-align: left;
  width: 320px;
  > input {
    border: 1px solid #c2c8d0;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.7);
    font-size: 16px;
    font-weight: 400;
    font-family: "Noto Sans KR", sans-serif;
    width: inherit;
    height: 52px;
    padding: 0 16px;
    margin-bottom: 16px;
    border-radius: 4px;
    transition: border 0.2s ease-in-out;
    &:focus {
      outline: none;
      border: 1px solid ${sVar.loginHLColor90};
    }
  }
  > button {
    width: inherit;
    height: 52px;
  }
`;

export const ConfirmPasswordFormDiv = styled(layout.FlexColumn100)`
  padding: 18px;
  border: 1px solid black;
  margin-top: 8px;
  gap: 18px;
  border-radius: 4px;
`;

// 이하 메인 대화 화면에서 사용되는 styles
// icon이 들어가는 버튼의 스타일링
export const IconUsingBtn = styled.button`
  width: 240px;
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

// main화면의 container 스타일링
export const MainContainer = styled(layout.FlexColumnRowCenter100)`
  width: calc(100vw - 260px);
  margin-left: 260px;
`;
// main 화면에서 GPT 모델 노출 부분의 스타일링
export const MainHeader = styled(layout.FlexCenter100)`
  background-color: ${sVar.bgReplColor};
  color: ${sVar.black70};
`;
// main 화면의 대화 컨테이너 스타일링 - 대화가 있을 때
export const MainConv = styled(layout.FlexColumnRowCenter100)`
  height: calc(100vh - (45px + 200px));
  overflow-y: scroll;
`;
// main 화면의 컨테이너 스타일링 - 대화가 없을 때
export const MainEmpty = styled(layout.FlexColumnCenter)`
  height: calc(100vh - (45px + 200px));
  > h1 {
    margin-top: 5rem;
    color: rgba(217, 217, 227, 0.9);
    font-weight: 600;
    font-size: 2.25rem;
  }
`;
// main 화면의 흰색 여백 영역 스타일링
export const MainFinalBox = styled(layout.FlexColumnRowCenter100)`
  height: 12rem;
  flex-shrink: 0;
  background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 13.94%, #fff 54.73%);
`;
export const MainFooter = styled(layout.FlexColumnCenterRow)`
  background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 13.94%, #fff 54.73%);
  background-color: transparent;
`;
// main 화면 아래쪽의 inputarea 스타일링
export const MainInputContainer = styled(layout.FlexCenterRow100)`
  background: white;
  max-width: 672px;
  width: 100%;
  min-height: 50px;
  border-radius: 0.75rem;
  border-width: 1px;
  border-color: ${sVar.black10};
  box-shadow: 0 0 15px ${sVar.black10};
  position: fixed;
  bottom: 52px;
  padding: 1rem 0 1rem 1rem;
  flex-grow: 1;
  z-index: 1;
  &:after,
  &:before {
    border: 0 solid #d9d9e3;
  }
  /* padding: 7px 0 7px 16px; */
`;

export const CreditContainer = styled(layout.FlexCenter100)`
  width: 150px;
  height: 40px;
  position: fixed;
  bottom: 125px;
  z-index: 1;
  border: 1px solid #d9d9e3;
  background-color: white;
  border-radius: 0.75rem;
  ${(props) => {
    if (props.credit === 0) {
      return `color: red;`;
    }
  }}
`;

export const MainInput = styled.textarea`
  /* box-sizing: border-box; */
  color: ${sVar.black80};
  display: flex;
  max-width: 654px;
  width: 100%;
  flex-wrap: wrap;
  max-height: 200px;
  height: 24px;
  overflow-y: hidden;
  padding-right: 3rem;
  padding-left: 0;
  /* background-color: transparent; */
  resize: none;
  line-height: 1.5em;
  border-width: 0;
  font-family: inherit;
  font-size: 0.9rem;
  &:after,
  &:before {
    border: 0 solid #d9d9e3;
  }
  &:focus {
    outline: 0;
  }
  &::placeholder {
    color: ${sVar.black40};
    font-weight: 400;
  }
  ${(props) => {
    if (!!props.height) {
      return `height: ${props.height};`;
    }
  }}
`;

// nav 컨테이너 스타일링
export const NavContainer = styled(layout.FlexColumnCenter)`
  min-width: 260px;
  padding: 10px;
  z-index: 2;
  /* height: 100vh; */
  justify-content: flex-start;
  background-color: ${sVar.darkSide};
  position: fixed;
  height: 100vh;
`;

// nav 대화 리스트 레이아웃
export const HeadFootBtnContainer = styled(layout.FlexColumn100)`
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  top: 60px;
  height: calc(100vh - 140px);
`;

// nav group text 스타일링
export const GroupText = styled.p`
  color: ${sVar.groupTextColor};
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  padding: 0.75rem 0.75rem 0.3rem 0.75rem;
`;

// userIcon 스타일링
export const UserIcon = styled(layout.FlexCenter100)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  color: ${sVar.white80};
  font-size: 0.1rem;
  border-radius: 0.1rem;
  /* ${(props) => {
    let width = "20px";
    let height = "20px";
    if (!!props.width) {
      width = `${props.width}px`;
    }
    if (!!props.height) {
      height = `${props.height}px`;
    }
    return `
      width: ${width};
      height: ${height};
    `;
  }} */
`;

// logout 메뉴 스타일링
export const LogoutMenu = styled(IconUsingBtn)`
  &:hover {
    background: ${sVar.sideFontColor};
  }
`;

// send icon container 스타일링
export const SendContainer = styled.div`
  margin: 0 20px 0 10px;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  ${(props) => {
    if (!!props.isContent) {
      // return `background: rgba(171, 104, 255, 1);`
      // return `background: #19C37D;`
      return `background: ${props.iconColor};`;
    }
  }}
`;

// main conversation 스타일링
export const ConvContainer = styled(layout.FlexCenter100)`
  padding: 24px 0;
  border-bottom: 1px solid ${sVar.lineColor};
  ${(props) => {
    if (!!props.isGPT) {
      return `
        background: ${sVar.bgReplColor};
      `;
    }
  }}
`;

export const ConvEntry = styled(layout.FlexCenter)`
  width: 768px;
  font-size: 11pt;
  line-height: 1.8;
  display: grid;
  grid-template-columns: 1fr 14fr;
  > p {
  }
  > div {
    max-width: 716px;
    > p {
      width: inherit;
      font-size: 11pt;
      line-height: 1.8;
      margin-bottom: 20px;
      max-width: 716px;
    }
  }
`;

// main 마지막의 div white
export const MainDivWhite = styled.div`
  width: calc(100vw - 260px);
  position: fixed;
  bottom: 0;
  z-index: 0;
  background: white;
  height: 140px;
  background: linear-gradient(to top, #fff, #fff 70%, transparent);
`;

// 응답 대기중의 커서 깜빡임 구현 animation
export const blink = keyframes`
  0% {opacity: 1;}
  50% {opacity: 0;} 
  100% {opacity: 1}
`;
// 응답시 보여줄 커서
export const Cursor = styled.div`
  display: flex;
  justify-content: center;
  width: 3px;
  height: 15px;
  background-color: ${sVar.black80};
  color: transparent;
  animation: 1s ${blink} step-end infinite;
`;
