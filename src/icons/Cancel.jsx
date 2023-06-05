import React from "react";
import * as sVar from "../styles/styleVariables"
import * as style from "../styles/styles"
import { useState } from 'react';

function Cancel({ id, name }) {
  const INIT_HEX = sVar.white60;
  const OVER_HEX = sVar.white100;
  const [fillColor, setFillColor] = useState(INIT_HEX);
  const onMouseOver = () => {
    setFillColor(OVER_HEX);
  };
  const onMouseOut = () => {
    setFillColor(INIT_HEX);
  };
  const smallBtnClickHandler = (event) => {
    event.stopPropagation();
    console.log(name)
}
  return (
    <style.TailIcon id={id} name={name} onClick={smallBtnClickHandler} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <svg width="16" height="16">
        <g class="cancel">
          <title>Layer 1</title>
          <g
            fill="none"
            id="svg_1"
            class="cancel"
            stroke={fillColor}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
          >
            <path
              class="cancel"
              d="m1.64,2.28l5.68,5.68"
              id="svg_2"
              transform="translate(1 0) scale(1.5625 1.5625)"
            />
            <path
              class="cancel"
              d="m1.64,7.96l5.68,-5.68"
              id="svg_3"
              transform="translate(1 0) scale(1.5625 1.5625)"
            />
          </g>
        </g>
      </svg>
    </style.TailIcon>
  );
}

export default Cancel;
