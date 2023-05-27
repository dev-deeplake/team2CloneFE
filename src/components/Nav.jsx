import React from 'react'
import IconUsingBtn from './IconUsingBtn'
import * as layout from "../styles/layouts"
import * as sVar from "../styles/styleVariables"
import * as style from "../styles/styles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // + 아이콘의 경우 FontAwesome에서 불러옴, 불러오기 위한 import
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // + 아이콘의 경우 FontAwesome에서 불러옴
import { ReactComponent as Chat } from "../icons/wordBalloon.svg"
import UserIcon from './UserIcon'

// email => redux 설정
// user email에 따라 랜덤 아이콘 만들기 구현
function Nav({email, hex}) {
  const dummies = {
    "success": true,
    "data": {
      "Today" : [
        {
          "chatId": 1,
          "chatName": "GPT사용법1",
        },
        {
          "chatId": 2,
          "chatName": "GPT사용법2",
        }],
    "Yesterday" : [
        { 
          "chatId": 3,
          "chatName": "GPT사용법3",
        },
        {
          "chatId": 4,
          "chatName": "GPT사용법4",
        }
      ]
    }
  }
  const dateKeys = Object.keys(dummies.data)
  return (
    <style.NavContainer>
      <IconUsingBtn customStyle={{border: `1px solid ${sVar.white20}`}} iconFront={<FontAwesomeIcon icon={faPlus} size="sm" style={{color: "#ffffff", padding: "0 10px 0 2px"}} />}>New chat</IconUsingBtn>
      {
        // data 객체 안에 있는 key값을 뽑기 
        // 해당 key를 기준으로 map 돌리기, 내용을 btn 씌워 반환
        dateKeys.map(group => {
          return (
            <layout.FlexColumnCenter style={{alignItems: "flex-start"}}>
              <style.GroupText>{group}</style.GroupText>
              {dummies["data"][group].map(entry => <IconUsingBtn iconFront={<Chat style={{transform: "scaleX(-1)", marginRight: "10px"}}/>} key={entry["chatId"]}>{entry["chatName"]}</IconUsingBtn>)}
            </layout.FlexColumnCenter>
          )
        })
      }
      <layout.FlexCenter style={{position: "fixed", bottom: "0", width: "252px", paddingTop: "4px", borderTop: `1px solid ${sVar.white20}`}}>
        <IconUsingBtn customStyle={{marginBottom: "8px"}} iconFront={<UserIcon email={email} hex={hex}/>}>{email}</IconUsingBtn> {/* user 프로필 버튼, 하단 고정  */}
      </layout.FlexCenter>
      
    </style.NavContainer>
  )
}

export default Nav