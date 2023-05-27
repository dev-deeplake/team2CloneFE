import React from "react";
import * as sVar from "../styles/styleVariables";
import * as layout from "../styles/layouts";
import * as style from "../styles/styles";

function IconUsingBtn({children, onClickHandler, iconFront=false, iconTailOne=false, iconTailTwo=false}) { // icon을 사용할 시 front 혹은 tail에 icon component를 삽입해주어야 함

  return (
    <style.IconUsingBtn onClick={onClickHandler}>
        {!!iconFront && (iconFront)}
        {children}
        {!!iconTailOne && (iconTailOne)}
        {!!iconTailTwo && (iconTailTwo)}
    </style.IconUsingBtn>
  )
}

export default IconUsingBtn;
