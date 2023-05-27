import React from 'react'
import styled from 'styled-components'
import * as layout from "../styles/layouts"
import * as style from "../styles/styles"
import * as sVar from "../styles/styleVariables"
import { ReactComponent as Logo } from "../icons/logo.svg"
import NameFloatInput from '../components/NameFloatInput'
import LoginHeader from '../components/LoginHeader'

function SignUp() {
  return (
    <layout.FlexColumnCenter>
        <layout.FlexCenter100 style={{paddingTop: "32px"}}>
            <Logo />
        </layout.FlexCenter100>
        <layout.FlexColumnCenter100 style={{padding: "80px"}}>
            <LoginHeader style={{color: `${sVar.black80}`}}>Welcome back</LoginHeader>
            <p style={{width: "320px", wordBreak: "break-word", textAlign: "center"}}>Please note that phone verification is required for signup. Your number will only be used to verify your identity for security purposes.</p>
            <style.UserForm>
                <NameFloatInput type="email"/>
                <NameFloatInput type="password" />
                <button>Continue</button>
            </style.UserForm>
            <p>Already have an account? <a href="#">Log in</a></p>
        </layout.FlexColumnCenter100>
    </layout.FlexColumnCenter>
  )
}

export default SignUp