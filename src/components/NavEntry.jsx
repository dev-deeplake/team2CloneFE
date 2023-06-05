import React from 'react'
import * as style from "../styles/styles"
import * as sVar from "../styles/styleVariables"
import * as layout from "../styles/layouts"
import { ReactComponent as Chat } from "../icons/wordBalloon.svg";
import Modify from '../icons/Modify';
import Delete from '../icons/Delete';
import Cancel from '../icons/Cancel';
import Confirm from '../icons/Confirm';

function NavEntry({children, onClick, renderCondition, id}) {

    const renderIcons = (condition) => {
        if (condition === "selected") {
            return (
                <layout.FlexCenter100 style={{width: "50px", justifyContent: "space-evenly"}}>
                    <Modify id={id} name="modify"/>
                    <Delete id={id} name="delete"/>
                </layout.FlexCenter100>
            )
        } else if (condition === "modify") {
            return (
                <layout.FlexCenter100 style={{width: "50px", justifyContent: "space-evenly"}}>
                    <Confirm id={id} name="modify_confirm"/>
                    <Cancel id={id} name="cancel"/>
                </layout.FlexCenter100>
            )
        } else if (condition === "delete") {
            return (
                <layout.FlexCenter100 style={{width: "50px", justifyContent: "space-evenly"}}>
                    <Confirm id={id} name="delete_confirm"/>
                    <Cancel id={id} name="cancel"/>
                </layout.FlexCenter100>
            )
        }
    }
  return (
    <style.IconUsingBtn name="chat" onClick={onClick} style={renderCondition === "selected" ? {boxShadow: `100px 100px ${sVar.darkLightened} inset`} : {}}>
        <Chat style={{ transform: "scaleX(-1)", marginRight: "10px" }} />
        { renderCondition === "modify" ? 
        (<input name="modify" style={{borderRadius: "2px", outline:"none", boxSizing: "border-box", width: "130px", textAlign: "left", color: `${sVar.white70}`, height:"20px", padding: "0", background: "transparent", marginRight: "8px", border: `1px solid rgba(53,99,205,1)`, marginRight: "5px", fontSize: "0.84rem"}} value={children} />) :
        (<span style={{width: "140px", textAlign: "left", color: `${sVar.white70}`, fontSize: "0.84rem"}}>{children}</span>)}
        <layout.FlexCenter100 style={{width: "50px"}}>
            {renderIcons(renderCondition)}
        </layout.FlexCenter100>
    </style.IconUsingBtn>
  )
}

export default NavEntry