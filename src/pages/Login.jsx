import React from 'react'
import styled from 'styled-components'
import * as layout from "../styles/layouts"
import * as sVar from "../styles/styleVariables"
import { ReactComponent as Logo } from "../icons/logo.svg"

function Login() {
    const Heading = styled.h1`
        font-size: 32px;
        font-weight: 700;
        margin-top: 24px;
    `
  return (
    <layout.FlexColumnCenter>
        <layout.FlexCenter100 style={{paddingTop: "32px"}}>
            <Logo />
        </layout.FlexCenter100>
        <layout.FlexColumnCenter100 style={{padding: "80px"}}>
            <Heading style={{color: `${sVar.black80}`}}>Welcome back</Heading>
        </layout.FlexColumnCenter100>
    </layout.FlexColumnCenter>
  )
}

export default Login