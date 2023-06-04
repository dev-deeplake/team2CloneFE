import React from "react";
import * as style from "../styles/styles";
import * as layout from "../styles/layouts";
import { ReactComponent as GptIcon } from "../icons/profile_ai.svg";
import UserIcon from "../icons/UserIcon";
import { cryptoKey, decrypt } from "../util/crypto";
import { marked } from "marked";
import { ReactComponent as Loading } from "../icons/loading.svg";

function Conversation({ isGPT, children }) {

  return (
    <style.ConvContainer isGPT={isGPT}>
      <style.ConvEntry>
        {/* {!!isGPT && isGPT !== "loading" ? <GptIcon /> : <UserIcon width="30px" height="30px" font="9pt" email={decrypt(localStorage.getItem("USR"), cryptoKey).email} hex={localStorage.getItem("userHex")} />} */}
        { isGPT === true && <GptIcon />}
        { isGPT === "loading" && <Loading />}
        { isGPT === false && <UserIcon width="30px" height="30px" font="9pt" email={decrypt(localStorage.getItem("USR"), cryptoKey).email} hex={localStorage.getItem("userHex")} />}
        {/* { children } */}
        { isGPT === true && <div dangerouslySetInnerHTML={{ __html: marked(children) }} /> }
        { isGPT === false && <div>{children}</div> }
        { isGPT === "loading" && <div style={{display:"flex", alignItems:"center"}}><style.Cursor>t</style.Cursor></div>}
        {/* {!!isGPT && isGPT !== "loading" ? <div dangerouslySetInnerHTML={{ __html: marked(children) }} /> : <div>{children}</div>} */}
        {/* {!!isGPT ? marked(children) : children} */}
      </style.ConvEntry>
    </style.ConvContainer>
  );
}

export default Conversation;
