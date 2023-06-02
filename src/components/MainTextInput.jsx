import React from 'react'
import styled from 'styled-components'
import * as layout from "../styles/layouts"
import * as style from "../styles/styles"
import * as sVar from "../styles/styleVariables"
import Send from '../icons/Send'
import { useState, useRef, useEffect } from 'react'

function MainTextInput({handleSubmit}) {
    const INIT_HEIGHT = "24px"
    const [inputHeight, setInputHeight] = useState(INIT_HEIGHT)
    const [lineCount, setLineCount] = useState(0)
    const textAreaRef = useRef(null)

    useEffect(() => {
        const countLines = () => {
            if(textAreaRef.current) {
                const lineHeight = parseInt(getComputedStyle(textAreaRef.current)["line-height"], 10)
                const scrollHeight = textAreaRef.current.scrollHeight
                const lines = Math.ceil(scrollHeight / lineHeight)
                console.log(lineHeight)
                console.log(scrollHeight)
                console.log(lines)
                console.log("=========")
                setLineCount(lines)
            }
        }
        countLines()

        // if ()
    })
  return (
    <style.MainInputContainer>
        <style.MainInput height={inputHeight} placeholder="send a message..."></style.MainInput>
        <Send isContent={true} handleSubmit={handleSubmit}/>
    </style.MainInputContainer>
  )
}

export default MainTextInput