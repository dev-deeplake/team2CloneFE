import React from 'react'
import * as layout from "../styles/layouts"
import * as style from "../styles/styles"
import * as sVar from "../styles/styleVariables"
import {ReactComponent as Power} from "../icons/power.svg"
import MainTextInput from './MainTextInput'
import { useQuery } from 'react-query'
import { gptAPI } from '../axios/api'
import Conversation from './Conversation'

function Main({handleSubmit, focusedChat}) {
    // focusedChat에 데이터가 있을 때 대화내용 조회 API (/api/chat/:chatId)를 통해 conversation을 받아와 띄워주기
    const {
      data: conv,
      isLoading: convIsLoading,
      isError: convIsError
    } = useQuery(["conversation", focusedChat], async ({ queryKey }) => {
      const [, chatId] = queryKey;
      const response = await gptAPI.getConvs(chatId);
      return response.data.data
    }, {
      enabled: !!focusedChat,
      // select: (data) => data.data.data
    })
    console.log(`focusedChat: ${focusedChat}`)
    console.log(conv)

  return (
    <layout.FlexColumnRowCenter100>
        <style.MainHeader
          style={{
            color: `${sVar.groupTextColor}`,
            fontSize:"0.875rem",
            fontWeight: "400",
            height: "45px",
            borderBottom: `1px solid rgba(225, 225, 225, 1)`}}><Power />Model: Default (GPT-3.5)</style.MainHeader>
        {/* 새 대화가 시작 되어야 출력되는 글-댓글 형식의 post */}
        { console.log(`conv::: ${conv}`) }
        { console.log( conv !== undefined )}
        {(conv !== undefined ) && conv.map((conversation) => {
          {console.log(conversation)}
          return (
            <Conversation isGPT={conversation.isGPT} convId={conversation.conversationId}>
              {conversation.conversation}
            </Conversation>
          )
          }
        )}
        {/* 새 대화가 시작되지 않았으면 화면 가운데에 ChatGPT 글자 띄우기 */}
        <MainTextInput focusedChat={focusedChat} handleSubmit={handleSubmit}/>
    </layout.FlexColumnRowCenter100>
  )
}

export default Main