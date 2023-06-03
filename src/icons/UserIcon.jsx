import React from 'react';
import * as style from "../styles/styles"

function UserIcon({email, hex, width="20px", height="20px", font="0.1rem"}) {
    const word = email.substr(0, 2).toUpperCase();
  return (
    <style.UserIcon style={{backgroundColor: `${hex}`, width: `${width}`, height: `${height}`, fontSize: `${font}`}}>{word}</style.UserIcon>
  )
}

export default UserIcon