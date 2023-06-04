import React from "react";
import * as layout from "../styles/layouts";
import * as style from "../styles/styles";
import * as sVar from "../styles/styleVariables";
import { ReactComponent as Power } from "../icons/power.svg";
import MainTextInput from "./MainTextInput";
import { useQuery } from "react-query";
import { gptAPI } from "../axios/api";
import Conversation from "./Conversation";

function Main({ handleSubmit, focusedChat }) {
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
      refetchInterval: 2000,
      // select: (data) => data.data.data
    }
  );

  return (
    <layout.FlexColumnRowCenter100>
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
      {console.log(conv !== undefined)}
        {conv !== undefined ? (
          <style.MainConv>
            {conv.map((conversation) => {
              console.log(conversation);
              return (
                <Conversation isGPT={conversation.isGPT} convId={conversation.conversationId}>
                  {conversation.conversation}
                </Conversation>
              );
            })}
          </style.MainConv>
          ) : (
            <style.MainEmpty>
              <h1>ChapGPT</h1>
            </style.MainEmpty>
          ) }
          {/* 새 대화가 시작되지 않았으면 화면 가운데에 ChatGPT 글자 띄우기 */}
      <style.MainFooter>
        <MainTextInput focusedChat={focusedChat} handleSubmit={handleSubmit} />
        <p style={{position: "fixed", bottom: "24px", fontSize: "7.7pt", color:`${sVar.black60}`}}>ChapGPT may produce inaccurate information about people, places, or facts. <u>ChapGPT June 04 Version</u></p>
      </style.MainFooter>
    </layout.FlexColumnRowCenter100>
  );
}

export default Main;
