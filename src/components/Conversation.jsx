import React from 'react'
import * as style from "../styles/styles"
import { ReactComponent as GptIcon } from "../icons/profile_ai.svg"
import UserIcon from '../icons/UserIcon'
import { cryptoKey, decrypt } from "../util/crypto";

function Conversation({isGPT, children}) {
  return (
   <style.ConvContainer isGPT={isGPT}>
    <style.ConvEntry>
        { !!isGPT ? <GptIcon /> : <UserIcon width="30px" height="30px" font="9pt" email={decrypt(localStorage.getItem("USR"), cryptoKey).email} hex={localStorage.getItem("userHex")} />}
        {children}
    </style.ConvEntry>

   </style.ConvContainer>
  )
}

export default Conversation