import React from 'react'
import styled from 'styled-components'
import * as layout from "../styles/layouts"
import * as style from "../styles/styles"
import * as sVar from "../styles/styleVariables"
import { useState, useRef, useEffect } from 'react'

function MainTextInput() {
    const INIT_HEIGHT = "24px"
    const [inputHeight, setInputHeight] = useState(INIT_HEIGHT)
    const [lineCount, setLineCount] = useState(0)
    const textAreaRef = useRef(null)

    useEffect(() => {
        const countLines = () => {
            if(textAreaRef.current) {
                const lineHeight = parseInt(getComputedStyle(textAreaRef.current)["line-height"], 10)
                console.log(lineHeight)
            }
        }
        countLines()
    })
  return (
    <style.MainInputContainer>
        <style.MainInput height={inputHeight} placeholder="send a message..."></style.MainInput>
    </style.MainInputContainer>
  )
}

export default MainTextInput