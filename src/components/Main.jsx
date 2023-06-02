import React from 'react'
import * as layout from "../styles/layouts"
import * as style from "../styles/styles"
import * as sVar from "../styles/styleVariables"
import {ReactComponent as Power} from "../icons/power.svg"
import MainTextInput from './MainTextInput'

function Main({handleSubmit}) {
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
        {/* 새 대화가 시작되지 않았으면 화면 가운데에 ChatGPT 글자 띄우기 */}
        <MainTextInput handleSubmit={handleSubmit}/>
    </layout.FlexColumnRowCenter100>
  )
}

export default Main