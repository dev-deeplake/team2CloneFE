import React from 'react'
import * as style from "../styles/styles"

function LogoutPopup({children, iconFront}) {
  return (
    <style.LogoutMenu>
        {!!iconFront && (iconFront)}
        {children}
    </style.LogoutMenu>
  )
}

export default LogoutPopup