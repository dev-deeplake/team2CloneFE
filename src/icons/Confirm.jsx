import React from "react";
import * as sVar from "../styles/styleVariables"
import * as style from "../styles/styles"
import { useState } from 'react';

function Confirm({ id, name }) {
  const INIT_HEX = sVar.white50;
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
    <style.TailIcon
      id={id}
      name={name}
      onClick={smallBtnClickHandler}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}>
      <svg width="16" height="16">
        <g class="layer">
          <title>Layer 1</title>
          <path
            d="m12.91,4.59l-6.87,7.07c-0.07,0.07 -0.15,0.1 -0.24,0.1s-0.17,-0.03 -0.24,-0.1l-3.44,-3.53c-0.13,-0.14 -0.13,-0.36 0,-0.5c0.13,-0.14 0.35,-0.14 0.49,0l3.19,3.29l6.63,-6.82c0.13,-0.14 0.35,-0.14 0.49,0c0.13,0.14 0.13,0.36 0,0.5l-0.01,0z"
            fill={fillColor}
            id="svg_1"
            stroke={fillColor}
          />
        </g>
      </svg>
    </style.TailIcon>
  );
}

export default Confirm;
