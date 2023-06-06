import React, { useRef, useEffect } from "react";
import * as layout from "../styles/layouts";
import * as style from "../styles/styles";
import * as sVar from "../styles/styleVariables";
import { ReactComponent as Power } from "../icons/power.svg";
import MainTextInput from "./MainTextInput";
import { useQuery, useQueryClient } from "react-query";
import { gptAPI, userAPI } from "../axios/api";
import Conversation from "./Conversation";

function Main({ handleSubmit, focusedChat }) {
  const queryClient = useQueryClient();
  // focusedChat에 데이터가 있을 때 대화내용 조회 API (/api/chat/:chatId)를 통해 conversation을 받아와 띄워주기
  const {
    data: conv,
    isLoading: convIsLoading,
    isError: convIsError,
  } = useQuery(
    ["conversation", focusedChat],
    async ({ queryKey }) => {
      const [, chatId] = queryKey;
      const response = await gptAPI.getConvs(chatId);
      return response.data.data;
    },
    {
      enabled: !!focusedChat,
      // refetchInterval: 2000,
      refetchOnWindowFocus: false,
      refetchInterval: (data) => {
        // 마지막 대화 객체의 isGPT가 true이면 다시 가져오지 않기
        return data && data[data.length - 1].isGPT ? false : 2000;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["credit"]);
      },
    }
  );

  const { data: credit } = useQuery(["credit"], userAPI.getCredit, {
    onSuccess: (res) => {
      console.log("credit is", res);
    },
    refetchOnWindowFocus: false,
    // refetchInterval: 1000,
    select: (data) => data.data.data.mycredit,
  });

  const ref = useRef() // 참조 생성

  return (
    <style.MainContainer>
      <style.MainHeader
        style={{
          color: `${sVar.groupTextColor}`,
          fontSize: "0.875rem",
          fontWeight: "400",
          height: "45px",
          borderBottom: `1px solid rgba(225, 225, 225, 1)`,
        }}
      >
        <Power />
        Model: Default (GPT-3.5)
      </style.MainHeader>
      {/* 새 대화가 시작 되어야 출력되는 글-댓글 형식의 post */}
      {console.log(`conv::: ${conv}`)}
      {/* {console.log(conv !== undefined)} */}
      {conv !== undefined ? (
        conv.map((conversation, idx) => {
          if (idx === conv.length - 1 && conversation.isGPT === false) {
            return (
              <>
                <Conversation isGPT={conversation.isGPT} convId={conversation.conversationId}>
                  {conversation.conversation}
                </Conversation>
                <Conversation isGPT="loading" convId="loading"></Conversation>
              </>
            );
          }
          // console.log(conv);
          // console.log(idx);
          return (
            <Conversation isGPT={conversation.isGPT} convId={conversation.conversationId}>
              {conversation.conversation}
            </Conversation>
          );
        })
      ) : (
        <style.MainEmpty>
          <h1>ChapGPT</h1>
        </style.MainEmpty>
      )}
      <style.MainFinalBox></style.MainFinalBox>
      {/* {conv !== undefined ? (
          <style.MainConv>
            {conv.map((conversation) => {
              console.log(conversation);
              return (
                <Conversation isGPT={conversation.isGPT} convId={conversation.conversationId}>
                  {conversation.conversation}
                </Conversation>
              );
            })}
              <style.MainFinalBox></style.MainFinalBox>
          </style.MainConv>
          ) : (
            <style.MainEmpty>
              <h1>ChapGPT</h1>
            </style.MainEmpty>
          ) } */}
      {/* 새 대화가 시작되지 않았으면 화면 가운데에 ChatGPT 글자 띄우기 */}
      <layout.FlexColumnCenterRow>
        {/* <style.CreditContainer credit={credit}>Remaining credits : {credit}</style.CreditContainer> */}
        <MainTextInput credit={credit} focusedChat={focusedChat} handleSubmit={handleSubmit} />
        <p
          style={{
            position: "fixed",
            bottom: "24px",
            fontSize: "7.7pt",
            color: `${sVar.black60}`,
            zIndex: "1",
          }}
        >
          ChapGPT may produce inaccurate information about people, places, or facts. <u>ChapGPT June 04 Version</u>
        </p>
        <style.MainDivWhite></style.MainDivWhite>
      </layout.FlexColumnCenterRow>
    </style.MainContainer>
  );
}

export default Main;
