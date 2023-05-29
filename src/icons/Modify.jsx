import React from 'react'
import { useState } from 'react'
import * as sVar from "../styles/styleVariables"

function Modify() {
    const INIT_HEX = sVar.white70
    const OVER_HEX = sVar.white100
    const [fillColor, setFillColor] = useState(INIT_HEX)
    const onMouseOver = () => {
        setFillColor(OVER_HEX)
    }
    const onMouseOut = () => {
        setFillColor(INIT_HEX)
    }
  return (
    <svg width="18" height="18" onMouseOver={onMouseOver} onMouseOut={onMouseOut} style={{marginRight: "4px"}}>
        <g class="layer">
            <title>Layer 1</title>
            <path d="m4.67,14.67l-2.67,0c-0.18,0 -0.35,-0.07 -0.47,-0.2c-0.12,-0.13 -0.2,-0.29 -0.2,-0.47l0,-2.67c0,-0.18 0.07,-0.35 0.2,-0.47l9.34,-9.34c0.26,-0.26 0.68,-0.26 0.94,0l2.67,2.67l0,0c0.26,0.26 0.26,0.68 0,0.94l-9.34,9.34c-0.12,0.12 -0.29,0.2 -0.47,0.2zm-2,-1.33l1.72,0l8.67,-8.67l-1.73,-1.72l-8.67,8.67l0,1.72l0.01,0zm12.01,0l-7.34,0l0,1.33l7.34,0l0,-1.33z"
            fill={fillColor}
            id="svg_1"/>
        </g>
    </svg>
  )
}

export default Modify