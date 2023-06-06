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
  return (
    <style.MainInputContainer>
      <style.MainInput onChange={(event) => setInputValue(event.target.value)} value={inputValue} height={inputHeight} placeholder="Send a message..."></style.MainInput>
      <Send iconColor={sessionStorage.getItem("userHex")} isContent={!!inputValue} handleSubmit={focusedChat === null ? () => handleSubmit(inputValue) : () => handleSubmit(inputValue, focusedChat)} />
    </style.MainInputContainer>
  );
}

export default MainTextInput;
