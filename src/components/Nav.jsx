import React, { useState, useEffect } from "react";
import IconUsingBtn from "./IconUsingBtn";
import * as layout from "../styles/layouts";
import * as sVar from "../styles/styleVariables";
import * as style from "../styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // + 아이콘의 경우 FontAwesome에서 불러옴, 불러오기 위한 import
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // + 아이콘의 경우 FontAwesome에서 불러옴
import { ReactComponent as Chat } from "../icons/wordBalloon.svg";
import Modify from "../icons/Modify";
import Delete from "../icons/Delete";
import { ReactComponent as Dots } from "../icons/dots.svg";
import UserIcon from "../icons/UserIcon";
import UserMenu from "./UserMenu";
import NavEntry from './NavEntry';

// email => redux 설정
// user email에 따라 랜덤 아이콘 만들기 구현
function Nav({ focusedSetter, email, hex, chats, navOnClick, newChatOnClick, focusedChat }) {
  const dateKeys = Object.keys(chats)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  // const [isFocused, setIsFocused] = useState(false)

  // const entryRenderer = (focusedState) => {
  //   console.log("entryRenderer=====")
  //   console.log(isFocused)
  //   console.log(focusedState)
  //   console.log(focusedChat)
  //   console.log("===================")
  //   if (isFocused) {
  //     return focusedState
  //   } else {
  //     return "none"
  //   }
  // }

  // const entryClickHandler = (event) => {
  //   console.log("chatId::::", event.currentTarget.id)
  //   if ((event.currentTarget.id == focusedChat) && !isFocused) {
  //     setIsFocused(true)
  //   } else if ((event.currentTarget.id != focusedChat) && !!isFocused) {
  //     setIsFocused(false)
  //   }
  // }

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize)
    // 함수 clean up
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [windowHeight])


  return (
          <style.NavContainer>
            <layout.FlexColumnCenter100 style={{height: "50px", position: "absolute", top: "10px", width: "260px"}}>
              <IconUsingBtn onClick={newChatOnClick} customStyle={{ border: `1px solid ${sVar.white20}`, width: "240px" }} iconFront={<FontAwesomeIcon icon={faPlus} size="sm" style={{ color: "#ffffff", padding: "0 10px 0 2px" }} />}>
                New chat
              </IconUsingBtn>
            </layout.FlexColumnCenter100>

            <style.HeadFootBtnContainer>
              {/* <NavEntry onClick={navOnClick} renderCondition="modify">test</NavEntry>
              <NavEntry onClick={navOnClick} renderCondition="none">test</NavEntry>
              <NavEntry onClick={navOnClick} renderCondition="selected">test</NavEntry>
              <NavEntry onClick={navOnClick} renderCondition="delete">test</NavEntry> */}
              {
              // data 객체 안에 있는 key값을 뽑기
              // 해당 key를 기준으로 map 돌리기, 내용을 btn 씌워 반환
              dateKeys.map((group) => {
                return (
                  <layout.FlexColumnCenter key={group} style={{ alignItems: "flex-start" }}>
                    {!!(chats[group].length) && (<style.GroupText>{group}</style.GroupText>)}
                    {!!(chats[group].length) && chats[group].map(entry => {
                      return (
                        <NavEntry
                          key={entry["chatId"]}
                          id={entry["chatId"]}
                          isFocused={focusedChat == entry["chatId"]}
                          onClick={navOnClick}
                          focusedSetter={focusedSetter}
                        >
                          {entry["chatName"]}
                        </NavEntry>
                      )

                    })}
                    {/* {!!(chats[group].length) && chats[group].map((entry) => {
                      if (focusedChat == entry["chatId"]) {
                        return (
                            <IconUsingBtn
                              onClick={navOnClick}
                              customStyle={{boxShadow: `100px 100px ${sVar.darkLightened} inset`}}
                              textWidth="170px"
                              iconFront={<Chat id={entry["chatId"]} style={{ transform: "scaleX(-1)", marginRight: "10px" }} />}
                              iconTailOne={<Modify id={entry["chatId"]} style={{ marginRight: "10px" }} />}
                              iconTailTwo={<Delete id={entry["chatId"]} />}
                              key={entry["chatId"]}
                              id={entry["chatId"]}
                            >
                              {entry["chatName"]}
                          </IconUsingBtn>
                        )
                      } else {
                        return (
                          <IconUsingBtn
                            onClick={navOnClick}
                            textWidth="170px"
                            iconFront={<Chat id={entry["chatId"]} style={{ transform: "scaleX(-1)", marginRight: "10px" }} />}
                            key={entry["chatId"]}
                            id={entry["chatId"]}
                          >
                            {entry["chatName"]}
                        </IconUsingBtn>
                        )
                      }
                    })} */}
                  </layout.FlexColumnCenter>
                );
              })
              }
            </style.HeadFootBtnContainer>

          <layout.FlexColumnCenter100 style={{height: "50px", position:"fixed", bottom: "0px", width: "260px"}}>
            <UserMenu iconFront={<UserIcon email={email} hex={hex} />} iconTailOne={<div style={{ width: "20px" }}></div>} iconTailTwo={<Dots />} email={email} />
          </layout.FlexColumnCenter100>
        </style.NavContainer>
  );
}

export default Nav;
