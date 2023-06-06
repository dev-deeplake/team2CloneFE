import React from "react";
import styled from "styled-components";
import * as layout from "../styles/layouts";
import * as style from "../styles/styles";
import * as sVar from "../styles/styleVariables";
import Send from "../icons/Send";
import { useState, useRef, useEffect } from "react";
import { useQueryClient } from "react-query";
import { gptAPI } from "../axios/api";

function MainTextInput({ handleSubmit, focusedChat }) {
  const INIT_HEIGHT = "24px";
  const INIT_INPUT_VALUE = "";
  const [inputHeight, setInputHeight] = useState(INIT_HEIGHT);
  const [inputValue, setInputValue] = useState(INIT_INPUT_VALUE);
  const [lineCount, setLineCount] = useState(0);
  const textAreaRef = useRef(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const countLines = () => {
      if (textAreaRef.current) {
        const lineHeight = parseInt(getComputedStyle(textAreaRef.current)["line-height"], 10);
        const scrollHeight = textAreaRef.current.scrollHeight;
        const lines = Math.ceil(scrollHeight / lineHeight);
        console.log(lineHeight);
        console.log(scrollHeight);
        console.log(lines);
        console.log(inputValue);
        console.log("=========");
        setLineCount(lines);
      }
    };
    countLines();
  }, [inputValue]);

  const submitHandler = async () => {
    // mutation과 연결되어있기 때문에 비동기처리를 실행하며, 그렇기 때문에 input을 비워주기 위해서는 해당 비동기 처리가 끝나고 나서 setInputValue를 초기화해야 함
    if (focusedChat === null) { // 초점 맞춰진 대화가 없으면 새 대화 시작, 그렇지 않을시 대화 이어나가기
      await handleSubmit(inputValue);
    } else {
      await handleSubmit(inputValue, focusedChat)
    }
    setInputValue(INIT_INPUT_VALUE) // InputValue 비워주기
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { // event.nativeEvent.isComposing이 false일 때만 동작 (맨 마지막 글자 재출력 방지)
      event.preventDefault() // 엔터키 쳤을 때의 줄바꿈 막기
      submitHandler()
    }
  }

  return (
    <style.MainInputContainer>
      <style.MainInput onKeyDown={handleKeyDown} onChange={(event) => setInputValue(event.target.value)} value={inputValue} height={inputHeight} placeholder="Send a message..."></style.MainInput>
      <Send iconColor={sessionStorage.getItem("userHex")} isContent={!!inputValue} handleSubmit={focusedChat === null ? () => handleSubmit(inputValue) : () => handleSubmit(inputValue, focusedChat)} />
    </style.MainInputContainer>
  );
}

export default MainTextInput;
