import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Main from "../components/Main";
import * as layout from "../styles/layouts";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { cryptoKey, decrypt } from "../util/crypto";
import { gptAPI } from "../axios/api";
import { useNavigate } from "react-router-dom";

function Layout() {

  const navigate = useNavigate();
  let email;
  try {
    email = decrypt(localStorage.getItem("USR"), cryptoKey).email;
  } catch (err) {
    console.log(`error::: ${err}`)
    navigate("/login");
  }
   // 암호화된 Email 복호화
  const INPUT_INIT_STATE = "";
  const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E"]; // F는 흐린 계열이 나오지 않게 하기 위해 제외
  const getHex = () => {
    let hex = "#";
    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * hexValues.length);
      hex += hexValues[index];
    }
    return hex;
  };

  // /api/chat으로의 get 요청 처리 및 해당 요청의 결과를 state로 관리하여 렌더링하는 파트 시작
  const [listResponse, setListResponse] = useState(false);
  const userHex = localStorage.getItem("userHex") ? localStorage.getItem("userHex") : localStorage.setItem("userHex", getHex());
  const queryClient = useQueryClient();
  const {
    data: chats,
    isLoading: listIsLoading,
    isError: listIsError,
  } = useQuery(["chat"], gptAPI.getChats, {
    select: (data) => data.data.data,
    // refetchInterval: 5000,
    enabled: !listResponse,
  });
  if (!listIsLoading && listIsError) {
    setListResponse(true);
    sessionStorage.setItem("Login", true);
  }
  if (listIsError) {
    alert("로그인이 필요합니다!");
    navigate("/login");
  }

  // /api/chat으로 post 요청을 보내 새로운 대화를 생성하고, 새로운 대화가 생성된 후 받아오는 response를 통해 chatId state 관리 및 응답 추출 관련 파트

  // focusedChat: 어떤 대화방이 focused 되어있는지 보여주는 state
  const [focusedChat, setFocusedChat] = useState(null)
  const navOnClickHandler = (event) => {
    setFocusedChat(event.target.id)
    console.log(event.target.id)
  }

  const makeChatMutation = useMutation(gptAPI.makeChat, {
    onSuccess: (res) => {
      console.log("makeChatMutationRes", res);
      queryClient.invalidateQueries(["chat"]);
    },
  });

  const contChatMutation = useMutation(({ask, chatId}) => gptAPI.continueChat(ask, chatId), {
    onSuccess: (res) => {
      console.log(`contChatMutationRes:::`, res);
      queryClient.invalidateQueries(["conversation"]);
    }
  })

  const handleNewSubmit = async (inputValue) => {
    const reqBody = { ask: inputValue } // 질문을 서버로 보내기 위한 요청 본문
    const reqResponse = await makeChatMutation.mutateAsync(reqBody);
    const reqAnswer = reqResponse.data
    // 응답 코드 관리
    let code = reqAnswer.code

    // chatId 설정
    if (reqAnswer.data.chatId != focusedChat) { setFocusedChat(reqAnswer.data.chatId) }
    
    console.log(`chatId::: ${reqAnswer.data.chatId}`)
    console.log(`answer::: ${reqAnswer.data.answer.content}`)

    // makeChatMutation.mutate({ ask: inputValue });
    // setInputValue("");

  };

  const handleReplSubmit = async (inputValue, chatId) => {
    // console.log("여기는 들어옴!")
    const reqBody = { ask: inputValue }
    const reqResponse = await contChatMutation.mutateAsync({ ask: reqBody, chatId });
    const reqAnswer = reqResponse.data
    console.log(reqAnswer)
  }


  return (
    <>
      {!!chats ? (
        <layout.Flex100>
          <Nav navOnClick={navOnClickHandler} focusedChat={focusedChat} email={email} hex={userHex} chats={chats} />
          <Main focusedChat={focusedChat} handleSubmit={focusedChat === null ? handleNewSubmit : handleReplSubmit} />
        </layout.Flex100>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Layout;
