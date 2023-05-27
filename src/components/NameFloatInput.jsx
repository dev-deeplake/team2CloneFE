import React from 'react'

function NameFloatInput({type, changeHandler, value, icon=false}) {
  return (
    <input required onChange={changeHandler} autoComplete="off" type={type} value={value} icon={icon}/>
  )
}

export default NameFloatInput