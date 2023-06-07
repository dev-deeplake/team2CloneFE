import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Main from "../components/Main";
import * as layout from "../styles/layouts";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { cryptoKey, decrypt } from "../util/crypto";
import { gptAPI, userAPI } from "../axios/api";
import { useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  const email = !!localStorage.getItem("USR") ? decrypt(localStorage.getItem("USR"), cryptoKey).email : "example@naver.com";

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
  const userHex = sessionStorage.getItem("userHex") ? sessionStorage.getItem("userHex") : sessionStorage.setItem("userHex", getHex());
  const queryClient = useQueryClient();
  const {
    data: chats,
    isLoading: listIsLoading,
    isError: listIsError,
  } = useQuery(["chat"], gptAPI.getChats, {
    select: (data) => data.data.data,
    // refetchInterval: 5000,
    enabled: !listResponse,
    onError: () => {
      alert("로그인이 필요합니다!");
      sessionStorage.removeItem("Login");
      navigate("/login");
    },
    onSuccess: () => {
      sessionStorage.setItem("Login", true);
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    if (email === "example@naver.com") {
      sessionStorage.removeItem("Login");
      navigate("/login");
    }
    if (!!sessionStorage.getItem("Logout")) {
      navigate("/login");
    }
  }, [navigate, email]);

  // /api/chat으로 post 요청을 보내 새로운 대화를 생성하고, 새로운 대화가 생성된 후 받아오는 response를 통해 chatId state 관리 및 응답 추출 관련 파트

  // focusedChat: 어떤 Id의 대화방이 focused 되어있는지 보여주는 state, true / false가 아닌 chatId가 들어감.
  const [focusedChat, setFocusedChat] = useState(null);

  // 클릭된 채팅방에 따라 focusedChat의 id를 바꿔주는 함수
  const navOnClickHandler = (event) => {
    event.stopPropagation();
    // console.log(event.currentTarget.name)
    // console.log(event.currentTarget.id)
    // console.log(event.currentTarget)
    setFocusedChat(event.currentTarget.id);
  };
  // const navOnClickHandler = (event) => {
  //   event.stopPropagation()
  //   setFocusedChat(event.currentTarget.id)
  //   if (event.currentTarget.id == focusedChat && !isFocused) {
  //     setIsFocused(true)
  //   } else if (event.currentTarget.id != focusedChat && !!isFocused) {
  //     setIsFocused(false)
  //   }
  // }

  const makeChatMutation = useMutation(gptAPI.makeChat, {
    onSuccess: (res) => {
      console.log("makeChatMutationRes", res);
      queryClient.invalidateQueries(["chat"]);
    },
    onError: (err) => {
      console.log("makeChatMutation error:", err);
      // credit 관련 에러(credit 부족)일 경우 알람 표시
      if (err.response.status === 402) {
        alert(
          `사용가능한 횟수를 모두 소진하였습니다.
사용가능 횟수는 매일 10회씩 충전됩니다.`
        );
      }
    },
  });

  const contChatMutation = useMutation(({ ask, chatId }) => gptAPI.continueChat(ask, chatId), {
    onSuccess: (res) => {
      console.log(`contChatMutationRes:::`, res);
      queryClient.invalidateQueries(["conversation"]);
    },
    onError: (err) => {
      // 에러가 발생하면 해당 채팅방의 데이터를 새로 가져오도록 함
      // credit 관련 에러(credit 부족)일 경우 알람 표시
      console.log("contChatMutation error:", err);
      if (err.response.status === 402) {
        alert(
          `사용가능한 횟수를 모두 소진하였습니다.
사용가능 횟수는 매일 10회씩 충전됩니다.`
        );
      }
      queryClient.invalidateQueries(["conversation", focusedChat]);
    },
  });

  const handleNewSubmit = async (inputValue) => {
    const reqBody = { ask: inputValue }; // 질문을 서버로 보내기 위한 요청 본문
    const reqResponse = await makeChatMutation.mutateAsync(reqBody);
    const reqAnswer = reqResponse.data;
    console.log(reqAnswer);
    // 응답 코드 관리
    let code = reqAnswer.code;

    // chatId 설정
    if (reqAnswer.data.chatId != focusedChat) {
      setFocusedChat(reqAnswer.data.chatId);
    }

    console.log(`chatId::: ${reqAnswer.data.chatId}`);
    console.log(`answer::: ${reqAnswer.data.answer.content}`);

    // makeChatMutation.mutate({ ask: inputValue });
    // setInputValue("");
  };

  const handleReplSubmit = async (inputValue, chatId) => {
    // console.log("여기는 들어옴!")
    const reqBody = { ask: inputValue };
    const reqResponse = await contChatMutation.mutateAsync({
      ask: reqBody,
      chatId,
    });
    const reqAnswer = reqResponse.data;
    console.log(reqAnswer);
  };

  // new Chat 버튼 클릭시 handler
  const newChatClickHandler = () => {
    setFocusedChat(null);
  };

  return (
    <>
      {!!chats ? (
        <layout.Flex100>
          <Nav focusedSetter={setFocusedChat} newChatOnClick={newChatClickHandler} navOnClick={navOnClickHandler} focusedChat={focusedChat} email={email} hex={userHex} chats={chats} />
          <Main focusedChat={focusedChat} handleSubmit={focusedChat === null ? handleNewSubmit : handleReplSubmit} />
        </layout.Flex100>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Layout;
