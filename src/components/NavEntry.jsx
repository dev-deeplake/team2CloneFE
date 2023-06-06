import React, { useEffect } from 'react'
import * as style from "../styles/styles"
import * as sVar from "../styles/styleVariables"
import * as layout from "../styles/layouts"
import { ReactComponent as Chat } from "../icons/wordBalloon.svg";
import Modify from '../icons/Modify';
import Delete from '../icons/Delete';
import Cancel from '../icons/Cancel';
import Confirm from '../icons/Confirm';
import { useState } from 'react';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { gptAPI } from '../axios/api';

function NavEntry({children, focusedSetter, onClick, isFocused, id}) {
    const INPUT_INIT_STATE = children.toString()
    const CLICKED_INIT_STATE = false

    const queryClient = useQueryClient();

    // 수정시 input의 내용 상태
    const [inputContent, setInputContent] = useState(INPUT_INIT_STATE)
    // 클릭된 아이콘의 상태
    const [clickedIcon, setClickedIcon] = useState(CLICKED_INIT_STATE)

    // modify - confirm 버튼 클릭시의 행동 handler
    const { mutateAsync: modifyMutation } = useMutation(({ newChatName, chatId }) => gptAPI.modifyName(newChatName, chatId), {
        onSuccess: async (res) => {
            console.log(res)
            setClickedIcon(CLICKED_INIT_STATE)
            queryClient.invalidateQueries(["chat"]);
        },
        onError: async (err) => {
            console.log(`modifyMutation err:::`, err)
        }
    })
    // delete - confirm 버튼 클릭시의 행동 handler
    const { mutateAsync: deleteMutation } = useMutation(gptAPI.deleteChat, {
        onSuccess: async (res) => {
            console.log(res)
            setClickedIcon(CLICKED_INIT_STATE)
            queryClient.invalidateQueries(["chat"]);
            focusedSetter(null);
        },
        onError: async (err) => {
            console.log(`deleteMutation err:::`, err)
        }
    })

    // isFocused의 값이 변화하면 클릭된 icon의 상태를 초기화
    useEffect(() => setClickedIcon(CLICKED_INIT_STATE), [isFocused])

    // renderIcons() : clickedIcon과 isFocused의 조건에 따라 아이콘 렌더링을 결정하는 함수
    const renderIcons = () => {
        if (isFocused) {
            if (!clickedIcon) {
                return (
                <layout.FlexCenter100 style={{width: "50px", justifyContent: "space-evenly"}}>
                    <Modify iconStateSetter={setClickedIcon} id={id} name="modify"/>
                    <Delete iconStateSetter={setClickedIcon} id={id} name="delete"/>
                </layout.FlexCenter100>
                )
            } else if (clickedIcon === "modify") {
                return (
                    <layout.FlexCenter100 style={{width: "50px", justifyContent: "space-evenly"}}>
                        <Confirm onClick={() => modifyMutation({ newChatName: inputContent, chatId: id })} id={id} name="modify_confirm"/>
                        <Cancel iconStateSetter={setClickedIcon} id={id}/>
                    </layout.FlexCenter100>
                )
            } else if (clickedIcon === "delete") {
                return (
                    <layout.FlexCenter100 style={{width: "50px", justifyContent: "space-evenly"}}>
                        <Confirm onClick={() => deleteMutation(id)} id={id} name="delete_confirm"/>
                        <Cancel iconStateSetter={setClickedIcon} id={id}/>
                    </layout.FlexCenter100>
                )
            }
        }
    }

    // const renderIcons = (condition) => {
    //     if (!isFocused) {
    //         return (
    //             <layout.FlexCenter100 style={{width: "50px", justifyContent: "space-evenly"}}>
    //                 <Modify onClick={focusedStateSetter} id={id} name="modify"/>
    //                 <Delete onClick={focusedStateSetter} id={id} name="delete"/>
    //             </layout.FlexCenter100>
    //         )
    //     } else if (condition === "modify") {
    //         return (
    //             <layout.FlexCenter100 style={{width: "50px", justifyContent: "space-evenly"}}>
    //                 <Confirm id={id} name="modify_confirm"/>
    //                 <Cancel id={id} name="cancel"/>
    //             </layout.FlexCenter100>
    //         )
    //     } else if (condition === "delete") {
    //         return (
    //             <layout.FlexCenter100 style={{width: "50px", justifyContent: "space-evenly"}}>
    //                 <Confirm id={id} name="delete_confirm"/>
    //                 <Cancel id={id} name="cancel"/>
    //             </layout.FlexCenter100>
    //         )
    //     }
    // }
    console.log("clickedIcon:::", clickedIcon)
  return (
    <style.IconUsingBtn id={id} name="chat" onClick={onClick} style={ isFocused ? {boxShadow: `100px 100px ${sVar.darkLightened} inset`} : {}}>
        <Chat style={{ transform: "scaleX(-1)", marginRight: "10px" }} />
        { clickedIcon === "modify" && isFocused ? 
        (<style.NavModifyInput name="modify" value={inputContent} onChange={(event) => setInputContent(event.target.value)} />) :
        (<span style={{width: "140px", textAlign: "left", color: `${sVar.white70}`, fontSize: "0.84rem"}}>{children}</span>)}
        <layout.FlexCenter100 style={{width: "50px"}}>
            {renderIcons()}
        </layout.FlexCenter100>
    </style.IconUsingBtn>
  )
}

export default NavEntry