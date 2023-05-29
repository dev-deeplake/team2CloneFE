import React from 'react'
import * as layout from "../styles/layouts"
import * as style from "../styles/styles"

function Main() {
  return (
    <layout.FlexColumnRowCenter100 style={{padding: "24px 8px"}}>
        {/* 번개모양 아이콘 필요! */}
        <style.MainHeader>Model: Default (GPT-3.5)</style.MainHeader>
        {/* 새 대화가 시작 되어야 출력되는 글-댓글 형식의 post */}
        {/* 새 대화가 시작되지 않았으면 화면 가운데에 ChatGPT 글자 띄우기 */}
        <style.MainInput>
            <textarea placeholder="send a message..."></textarea>
        </style.MainInput>
    </layout.FlexColumnRowCenter100>
  )
}

export default Main