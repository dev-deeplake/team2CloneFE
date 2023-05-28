import React from 'react';
import * as style from "../styles/styles"

function UserIcon({email, hex}) {
    const word = email.substr(0, 2).toUpperCase();
  return (
    <style.UserIcon style={{backgroundColor: `${hex}`}}>{word}</style.UserIcon>
  )
}

export default UserIcon