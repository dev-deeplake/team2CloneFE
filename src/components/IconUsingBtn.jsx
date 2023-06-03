import React from "react";
import * as sVar from "../styles/styleVariables";
import * as layout from "../styles/layouts";
import * as style from "../styles/styles";

function IconUsingBtn({id, children, textWidth, customStyle, onClick, selected, iconFront=false, iconTailOne=false, iconTailTwo=false}) { // icon을 사용할 시 front 혹은 tail에 icon component를 삽입해주어야 함
  return (
    <style.IconUsingBtn id={id} style={customStyle} onClick={onClick}>
        <layout.FlexCenterRow100 id={id} style={{color: `${sVar.white90}`, lineHeight: "1.25rem", fontSize: "0.83rem", width: `${textWidth}`}}>
          {!!iconFront && (iconFront)}
          {children}
        </layout.FlexCenterRow100>
        <layout.FlexCenter100 id={id} style={{width: "50px", left: "195px"}}>
          {!!iconTailOne && (iconTailOne)}
          {!!iconTailTwo && (iconTailTwo)}
        </layout.FlexCenter100>
    </style.IconUsingBtn>
  )
}

export default IconUsingBtn;
